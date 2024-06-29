import { Component, OnInit } from '@angular/core';
import { Group, User } from '../../Models/Models';
import { StorageService } from '../../services/storage/storage.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { Router } from '@angular/router';
import { UserService } from '../../services/DataServices/user.service';
import { GroupMembershipService } from '../../services/DataServices/group-membership.service';
import { GroupService } from '../../services/DataServices/group.service';
@Component({
  selector: 'app-user-home-page',
  standalone: true,
  imports: [FormsModule, CommonModule, TableModule, DialogModule],
  templateUrl: './user-home-page.component.html',
  styleUrl: './user-home-page.component.scss'
})
export class UserHomePageComponent implements OnInit {
  loggedInUser: User | null = null;
  userGroups: Group[] = [];
  loginForm = { username: '', password: '' };
  displayGroupDialog: boolean = false;
  newGroup: Group = { groupId: 0, groupName: '', description: '', createdAt: new Date(), metrics: [] };

  constructor(private storageService: StorageService, private userService: UserService, private router: Router,
    private groupService: GroupService, private groupMembershipService: GroupMembershipService
  ) { }

  ngOnInit() {
    const userId = this.storageService.getStorage('loggedInUserId');
    if (userId) {
      this.loggedInUser = this.userService.getLoggedInUser();
      this.loadUserGroups(parseInt(userId));
    }
  }

  private loadUserGroups(userId: number): void {
   this.groupService.getGroupsByUserId(userId).subscribe(groups => {
      this.userGroups = groups;
    });
  }
logOut() {
    this.userService.LogOut();
    this.router.navigate(['/user-home-page']);
  }
  login() {
    this.userService.LogIn(this.loginForm.username, this.loginForm.password);
    
  }

  updateUserDetails() {
    if (this.loggedInUser) {
      this.userService.update(this.loggedInUser.userId, this.loggedInUser)
    }
  }

  showGroupDialog() {
    this.displayGroupDialog = true;
  }

  saveGroup() {
    if (this.loggedInUser) {
      this.newGroup.groupId = new Date().getTime(); // Mock ID; replace with actual ID generation logic
      this.newGroup.createdAt = new Date();
      this.userService.addGroup(this.newGroup, this.loggedInUser.userId);
      this.loadUserGroups(this.loggedInUser!.userId);
      this.newGroup = { groupId: 0, groupName: '', description: '', createdAt: new Date(), metrics: [] };
      this.displayGroupDialog = false;
      
    }
  }

  openGroupEditor(groupId: number) {
    this.router.navigate(['/group-viewer', groupId]);
  }

}