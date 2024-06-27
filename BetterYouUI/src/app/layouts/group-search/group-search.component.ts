import { Component, OnInit } from '@angular/core';
import { GroupService, GroupMembershipService, UserService } from '../../services/ApiCalls/ApiCalls';
import { Group } from '../../Models/Models';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { StorageService } from '../../services/storage/storage.service';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-group-search',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule,ButtonModule, InputTextModule],
  templateUrl: './group-search.component.html',
  styleUrl: './group-search.component.scss'
})
export class GroupSearchComponent  implements OnInit {
  groups: Group[] = [];
  filteredGroups: Group[] = [];
  userId: number | null = null;

  constructor(
    private groupService: GroupService,
    private groupMembershipService: GroupMembershipService,
    private userService: UserService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const storedUserId = this.storageService.getStorage('userId');
    if (storedUserId) {
      this.userId = parseInt(storedUserId, 10);
    }
    this.loadGroups();
  }

  private loadGroups(): void {
    this.groupService.getAll().subscribe(groups => {
      this.groups = groups;
      this.filteredGroups = this.groups;
    });
  }

  onSearch(event: any): void {
    const query = event.target.value.toLowerCase();
    this.filteredGroups = this.groups.filter(group =>
      group.groupName.toLowerCase().includes(query) ||
      group.description.toLowerCase().includes(query)
    );
  }

  onViewGroup(group: Group): void {
    if (this.userId !== null) {
      this.checkMembershipAndNavigate(group);
    } else {
      this.router.navigate(['/default-group-viewer', group.groupId]);
    }
  }

  private checkMembershipAndNavigate(group: Group): void {
    this.groupMembershipService.getAll().subscribe(memberships => {
      const membership = memberships.find(m => m.groupId === group.groupId && m.userId === this.userId);
      if (membership && membership.isAdmin) {
        this.router.navigate(['/admin-group-editor', group.groupId]);
      } else {
        this.router.navigate(['/user-group-view', group.groupId]);
      }
    });
  }
}