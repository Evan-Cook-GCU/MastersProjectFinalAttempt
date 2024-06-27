import { Injectable } from '@angular/core';
import { GroupMembership } from '../../../Models/Models';
import { MOCK_GROUP_MEMBERSHIPS } from '../mock-data/mock-data';

@Injectable({
  providedIn: 'root'
})
export class GroupMembershipService {
  private groupMemberships: GroupMembership[] = MOCK_GROUP_MEMBERSHIPS;

  constructor() { }

  getGroupMemberships(): GroupMembership[] {
    return this.groupMemberships;
  }

  getGroupMembershipById(membershipId: number): GroupMembership | null {
    return this.groupMemberships.find(m => m.membershipId === membershipId) || null;
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
