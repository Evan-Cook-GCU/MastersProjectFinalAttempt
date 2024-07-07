import { Component, Input, input, SimpleChanges } from '@angular/core';
import { GroupMembershipService } from '../../services/DataServices/group-membership.service';
import { UserService } from '../../services/DataServices/user.service';
import { Group, GroupMembership, User } from '../../Models/Models';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-membership-management',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule,],
  templateUrl: './membership-management.component.html',
  styleUrl: './membership-management.component.scss'
})
export class MembershipManagementComponent {
 @Input() group: Group | null = null;
 groupMembers: User[] = [];
 groupMemberShips: GroupMembership[] = [];
 membershipsLoaded: boolean = false;
 constructor(
  private membershipService: GroupMembershipService,
  private userService: UserService,
) { }

ngOnInit(): void {
  this.updateGroup();
}

updateGroup(): void {
  if (this.group && this.group.groupId != 0) {
    this.userService.getGroupMembers(this.group.groupId).subscribe(groupMembers => {
      this.groupMembers = groupMembers;
      this.loadMemberships();
    });
  }
}

ngOnChanges(changes: SimpleChanges): void {
  if (changes['group']) {
    this.updateGroup();
  }
}
loadMemberships(): void {
  if (this.group) {
    this.membershipService.getMembershipsByGroup(this.group.groupId).subscribe(memberships => {
      this.groupMemberShips = memberships;
      this.membershipsLoaded = true;
    });
  }
}
makeAdmin(member: User): void {
  const membership = this.findMembership(member.userId);
  if (membership) {
    membership.isAdmin = true;
    this.membershipService.updateGroupMembership(membership).subscribe(() => this.updateGroup());
  }
}

removeAdminStatus(member: User): void {
  const membership = this.findMembership(member.userId);
  if (membership) {
    membership.isAdmin = false;
    this.membershipService.updateGroupMembership(membership).subscribe(() => this.updateGroup());
  }
}

removeMember(member: User): void {
  const membership = this.findMembership(member.userId);
  if (membership) {
    this.membershipService.deleteGroupMembership(membership.membershipId).subscribe(() => this.updateGroup());
  }
}
isAdmin(member: User): boolean {
  const membership = this.findMembership(member.userId);
  return membership ? membership.isAdmin : false;
}
private findMembership(userId: number): GroupMembership | undefined {
  return this.groupMemberShips.find(m => m.userId === userId && m.groupId === this.group?.groupId);
}
  
}
