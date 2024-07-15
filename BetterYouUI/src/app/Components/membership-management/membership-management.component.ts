import { Component, Input, input, SimpleChanges } from '@angular/core';
import { GroupMembershipService } from '../../services/DataServices/group-membership.service';
import { UserService } from '../../services/DataServices/user.service';
import { Group, GroupMembership, User } from '../../Models/Models';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ConversationService } from '../../services/ConversationService.service';

@Component({
  selector: 'app-membership-management',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, DialogModule, FormsModule],
  templateUrl: './membership-management.component.html',
  styleUrl: './membership-management.component.scss'
})
export class MembershipManagementComponent {
  @Input() group: Group | null = null;
  groupMembers: User[] = [];
  groupMemberShips: GroupMembership[] = [];
  membershipsLoaded: boolean = false;
  displayBanDialog: boolean = false;
  selectedMember: User | null = null;
  banReason: string = '';
  loggedInUser: User | null = null;
  constructor(
    private membershipService: GroupMembershipService,
    private userService: UserService,
    private conversationService: ConversationService
  ) { }

  ngOnInit(): void {
    this.updateGroup();
    this.loggedInUser = this.userService.getLoggedInUser();
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

  showBanDialog(member: User): void {
    this.selectedMember = member;
    this.displayBanDialog = true;
  }

  cancelBan(): void {
    this.displayBanDialog = false;
    this.selectedMember = null;
    this.banReason = '';
  }

  confirmBan(): void {
    if (this.selectedMember) {
      const membership = this.findMembership(this.selectedMember.userId);
      if (membership) {
        // Log the ban reason somewhere if necessary
        console.log(`Banning user: ${this.selectedMember.userName}, Reason: ${this.banReason}`);
        this.membershipService.deleteGroupMembership(membership.membershipId).subscribe(() => this.updateGroup());

        if (this.loggedInUser) {
          this.conversationService
            .getConversation(this.loggedInUser.userId, this.selectedMember.userId)
            .subscribe((conversation) => {
              if (this.loggedInUser) {
              this.conversationService.sendMessage(conversation.conversationId, this.loggedInUser.userId, `You have been banned from the group ${this.group?.groupName} for the following reason: ${this.banReason}`);
              }
            });
        }
      }
    }
    this.displayBanDialog = false;
    this.selectedMember = null;
    this.banReason = '';
  }


  removeMember(member: User): void {
    // This method is no longer used, but you might want to keep it for other purposes
  }
  isAdmin(member: User): boolean {
    const membership = this.findMembership(member.userId);
    return membership ? membership.isAdmin : false;
  }
  isBanned(member: User): boolean {
    const membership = this.findMembership(member.userId);
    return membership ? membership.isBanned : false;
  }
  private findMembership(userId: number): GroupMembership | undefined {
    return this.groupMemberShips.find(m => m.userId === userId && m.groupId === this.group?.groupId);
  }

}
