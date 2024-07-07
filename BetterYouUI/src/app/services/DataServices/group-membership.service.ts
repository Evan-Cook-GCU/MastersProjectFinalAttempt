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
  
  getGroupMemberships(): Observable<GroupMembership[]> {
    return this.http.get<GroupMembership[]>(`${baseUrl}api/groupmemberships`);
  }
  getMembershipsByGroup(groupId: number): Observable<GroupMembership[]> {
    return this.http.get<GroupMembership[]>(`${baseUrl}api/groupmemberships/group/${groupId}`);
  }
  getGroupMembershipById(membershipId: number): Observable<GroupMembership> {
    return this.http.get<GroupMembership>(`${baseUrl}api/groupmemberships/${membershipId}`);
  }

  addGroupMembership(membership: GroupMembership): Observable<GroupMembership> {
    return this.http.post<GroupMembership>(`${baseUrl}api/groupmemberships`, membership);
  }

  updateGroupMembership(updatedMembership: GroupMembership): Observable<GroupMembership> {
    return this.http.put<GroupMembership>(`${baseUrl}api/groupmemberships/${updatedMembership.membershipId}`, updatedMembership);
  }

  deleteGroupMembership(membershipId: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}api/groupmemberships/${membershipId}`);
  }
}
