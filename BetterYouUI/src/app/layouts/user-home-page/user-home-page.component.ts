import { Component, OnInit } from '@angular/core';
import { Group, User } from '../../Models/Models';
import { StorageService } from '../../services/storage/storage.service';
import { UserService } from '../../services/DataServices/UserMock/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-home-page',
  standalone: true,
  imports: [FormsModule,CommonModule,TableModule, DialogModule],
  templateUrl: './user-home-page.component.html',
  styleUrl: './user-home-page.component.scss'
})
export class UserHomePageComponent implements  OnInit{
  loggedInUser: User | null = null;
  userGroups: Group[] = [];
  loginForm = { username: '', password: '' };
  displayGroupDialog: boolean = false;
  newGroup: Group = { groupId: 0, groupName: '', description: '', createdAt: new Date(), metrics: [] };

  constructor(private storageService: StorageService, private userService: UserService, private router: Router) {}


  ngOnInit() {
    const userId = this.storageService.getStorage('loggedInUserId');
    if (userId) {
      this.loggedInUser = this.userService.getUserById(parseInt(userId, 10));
      if (this.loggedInUser) {
        this.userGroups = this.userService.getGroupsByUserId(this.loggedInUser.userId);
      }
    }
  }

  login() {
    const user = this.userService.getUsers().find(u => u.userName === this.loginForm.username);
    if (user && user.passwordHash === this.hashPassword(this.loginForm.password)) {
      this.loggedInUser = user;
      this.storageService.setStorage('loggedInUserId', user.userId.toString());
      this.userGroups = this.userService.getGroupsByUserId(user.userId);
    } else {
      alert('Invalid username or password');
    }
  }

  updateUserDetails() {
    if (this.loggedInUser) {
      this.userService.updateUser(this.loggedInUser);
      alert('User details updated');
    }
  }

  hashPassword(password: string): string {
    // Mock hash function; replace with real hash if necessary
    return password.split('').reverse().join(''); // Just a mock; replace with actual hash logic
  }

  showGroupDialog() {
    this.displayGroupDialog = true;
  }

  saveGroup() {
    if (this.loggedInUser) {
      this.newGroup.groupId = new Date().getTime(); // Mock ID; replace with actual ID generation logic
      this.newGroup.createdAt = new Date();
      this.userService.addGroup(this.newGroup, this.loggedInUser.userId);
      this.userGroups = this.userService.getGroupsByUserId(this.loggedInUser.userId);
      this.newGroup = { groupId: 0, groupName: '', description: '', createdAt: new Date(), metrics: [] };
      this.displayGroupDialog = false;
    }
  }
  openGroupEditor(groupId: number) {
    this.router.navigate(['/admin-group-editor', groupId]);
  }
  
}