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
import { ChatComponent } from "../../Components/chat/chat.component";
@Component({
  selector: 'app-user-home-page',
  standalone: true,
  imports: [FormsModule, CommonModule, TableModule, DialogModule, ChatComponent],
  templateUrl: './user-home-page.component.html',
  styleUrl: './user-home-page.component.scss'
})
export class UserHomePageComponent implements OnInit {
  loggedInUser: User | null = null;
  userGroups: Group[] = [];
  loginForm = { username: '', password: '' };
  displayGroupDialog: boolean = false;

  displaySignupDialog: boolean = false;
  newGroup: Group = { groupId: 0, groupName: '', description: '', createdAt: new Date(), metrics: [] };
  newUser: User = { userId: 0, userName: '', email: '', passwordHash: '', createdAt: new Date() };

  constructor(private storageService: StorageService, private userService: UserService, private router: Router,
    private groupService: GroupService, private groupMembershipService: GroupMembershipService
  ) { }

  ngOnInit() {
    const userId = this.userService.getLoggedInUserId();
    if (userId) {
      this.loggedInUser = this.userService.getLoggedInUser();
      this.loadUserGroups(userId);
    }
  }

  private loadUserGroups(userId: number): void {
   this.groupService.getGroupsByUserId(userId).subscribe(groups => {
      this.userGroups = groups;
    });
  }
logOut() {
    this.userService.LogOut();
    window.location.reload();
    
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
  showSignupDialog() {
    this.displaySignupDialog = true;
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
  signup() {
    this.newUser.createdAt = new Date();
    this.userService.createUser(this.newUser).subscribe({
      next: user => {
        this.newUser = { userId: 0, userName: '', email: '', passwordHash: '', createdAt: new Date() };
        this.displaySignupDialog= false;
      },
      error: error => {
        this.displaySignupDialog= false;
      }
    });
  }
  openGroupEditor(groupId: number) {
    this.router.navigate(['/group-viewer', groupId]);
  }

}