import { Injectable } from '@angular/core';
import { GroupMembership } from '../../../Models/Models';

@Injectable({
  providedIn: 'root'
})
export class GroupMembershipService {
  private groupMemberships: GroupMembership[] = [
    {
      membershipId: 1,
      userId: 1,
      groupId: 1,
      isAdmin: true,
      joinedAt: new Date('2022-01-01T10:00:00Z'),
      metricData: []
    },
    {
      membershipId: 2,
      userId: 2,
      groupId: 2,
      isAdmin: false,
      joinedAt: new Date('2022-02-01T11:00:00Z'),
      metricData: []
    }
  ];

  constructor() { }

  getGroupMemberships(): GroupMembership[] {
    return this.groupMemberships;
  }

  getGroupMembershipById(membershipId: number): GroupMembership | null {
    const membership = this.groupMemberships.find(m => m.membershipId === membershipId);
    return membership ? membership : null;
  }

  addGroupMembership(membership: GroupMembership): void {
    this.groupMemberships.push(membership);
  }

  updateGroupMembership(updatedMembership: GroupMembership): void {
    const index = this.groupMemberships.findIndex(m => m.membershipId === updatedMembership.membershipId);
    if (index !== -1) {
      this.groupMemberships[index] = updatedMembership;
    }
  }

  deleteGroupMembership(membershipId: number): void {
    this.groupMemberships = this.groupMemberships.filter(m => m.membershipId !== membershipId);
  }
}
