import { Injectable } from '@angular/core';
import { User, Group, GroupMembership } from '../../../Models/Models';
import { GroupMembershipService } from '../GroupMembershipMock/group-membership.service';
import { GroupService } from '../GroupMock/group.service';
import { MOCK_USERS } from '../mock-data/mock-data';
@Injectable({
  providedIn: 'root'
})
export class UserService{
  private users: User[] = MOCK_USERS;

  constructor(
    private groupService: GroupService,
    private groupMembershipService: GroupMembershipService
  ) {}

  getGroupsByUserId(userId: number): Group[] {
    const membershipIds = this.groupMembershipService
      .getGroupMemberships()
      .filter(membership => membership.userId === userId)
      .map(membership => membership.groupId);

    return this.groupService
      .getGroups()
      .filter(group => membershipIds.includes(group.groupId));
  }

  addGroup(group: Group, userId: number): void {
    this.groupService.addGroup(group);
    const newMembership: GroupMembership = {
      membershipId: new Date().getTime(), // Mock ID; replace with actual ID generation logic
      userId: userId,
      groupId: group.groupId,
      isAdmin: true,
      joinedAt: new Date(),
      metricData: []
    };
    this.groupMembershipService.addGroupMembership(newMembership);
  }

  getUsers(): User[] {
    return this.users;
  }

  updateUser(updatedUser: User): void {
    const index = this.users.findIndex(user => user.userId === updatedUser.userId);
    if (index !== -1) {
      this.users[index] = updatedUser;
    }
  }

  getUserById(userId: number): User | null {
    return this.users.find(user => user.userId === userId) || null;
  }

  addUser(user: User): void {
    this.users.push(user);
  }

  deleteUser(userId: number): void {
    this.users = this.users.filter(user => user.userId !== userId);
  }
}
