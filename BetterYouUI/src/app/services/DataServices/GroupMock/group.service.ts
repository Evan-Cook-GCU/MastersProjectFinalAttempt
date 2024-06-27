import { Injectable } from '@angular/core';
import { Group } from '../../../Models/Models';
import { MOCK_GROUPS } from '../mock-data/mock-data';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private groups: Group[] = MOCK_GROUPS;

  constructor() { }

  getGroups(): Group[] {
    return this.groups;
  }

  getGroupById(groupId: number): Group | null {
    return this.groups.find(group => group.groupId === groupId) || null;
  }

  addGroup(group: Group): void {
    this.groups.push(group);
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