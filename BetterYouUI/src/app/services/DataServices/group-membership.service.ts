import { Injectable } from '@angular/core';
import { GroupMembership, baseUrl } from '../../Models/Models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupMembershipService {
  private groupMemberships: GroupMembership[] = [];

  constructor(private http:HttpClient) { }

  getMembership(userId: number, groupId: number):  Observable<GroupMembership> {
    return this.http.get<GroupMembership>(baseUrl + 'api/groupmemberships/user/' + userId+'/group/'+groupId);
  }
  
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
