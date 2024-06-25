import { Injectable } from '@angular/core';
import { Group, GroupMembership, User } from '../../Models/Models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [
      {
          userId: 1,
          userName: 'JohnDoe',
          email: 'johndoe@example.com',
          passwordHash: 'tset', // Mocked hash
          createdAt: new Date('2022-01-01T10:00:00Z')
      },
      {
          userId: 2,
          userName: 'JaneSmith',
          email: 'janesmith@example.com',
          passwordHash: '5d41402abc4b2a76b9719d911017c592', // Mocked hash
          createdAt: new Date('2022-02-01T11:00:00Z')
      },
      {
          userId: 3,
          userName: 'AliceJohnson',
          email: 'alicejohnson@example.com',
          passwordHash: '7c6a180b36896a0a8c02787eeafb0e4c', // Mocked hash
          createdAt: new Date('2022-03-01T12:00:00Z')
      }
  ];
  private groups: Group[] = [ /*... define your groups ...*/ ];
  private groupMemberships: GroupMembership[] = [ /*... define your memberships ...*/ ];
  constructor() { }
  
  getGroupsByUserId(userId: number): Group[] {
    const membershipIds = this.groupMemberships
      .filter(membership => membership.userId === userId)
      .map(membership => membership.groupId);
    return this.groups.filter(group => membershipIds.includes(group.groupId));
  }

  addGroup(group: Group, userId: number): void {
    this.groups.push(group);
    const newMembership: GroupMembership = {
      membershipId: new Date().getTime(), // Mock ID; replace with actual ID generation logic
      userId: userId,
      groupId: group.groupId,
      isAdmin: true,
      joinedAt: new Date()
    };
    this.groupMemberships.push(newMembership);
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
   var user= this.users.find(user => user.userId === userId);
   if(user){
     return user;
   }else{
     return null;
   }
  }

  addUser(user: User): void {
      this.users.push(user);
  }

  deleteUser(userId: number): void {
      this.users = this.users.filter(user => user.userId !== userId);
  }
  
}
