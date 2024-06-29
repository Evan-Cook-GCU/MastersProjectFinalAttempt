import { Injectable } from '@angular/core';
import { Group, baseUrl } from '../../Models/Models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private groups: Group[] = [];

  constructor(private http: HttpClient) { }

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(baseUrl + 'api/groups');
  }
  
  getGroupById(groupId: number): Observable<Group> {
    return this.http.get<Group>(baseUrl + 'api/groups/' + groupId);
  }

  addGroup(group: Group): void {
    this.groups.push(group);
  }
  getGroupsByUserId(userId: number):Observable<Group[]> {
    
    return this.http.get<Group[]>(baseUrl + 'api/users/' + userId + '/groups');
  }
  updateGroup(updatedGroup: Group): void {
    const index = this.groups.findIndex(group => group.groupId === updatedGroup.groupId);
    if (index !== -1) {
      this.groups[index] = updatedGroup;
    }
  }

  deleteGroup(groupId: number): void {
    this.groups = this.groups.filter(group => group.groupId !== groupId);
  }
}