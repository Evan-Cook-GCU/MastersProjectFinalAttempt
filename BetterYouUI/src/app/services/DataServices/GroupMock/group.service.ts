import { Injectable } from '@angular/core';
import { Group } from '../../../Models/Models';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private groups: Group[] = [
    {
      groupId: 1,
      groupName: 'Admin',
      description: 'Administrators Group',
      createdAt: new Date('2022-01-01T10:00:00Z'),
      metrics: []
    },
    {
      groupId: 2,
      groupName: 'Users',
      description: 'Regular Users Group',
      createdAt: new Date('2022-02-01T11:00:00Z'),
      metrics: []
    }
  ];

  constructor() { }

  getGroups(): Group[] {
    return this.groups;
  }

  getGroupById(groupId: number): Group | null {
    const group = this.groups.find(group => group.groupId === groupId);
    return group ? group : null;
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
