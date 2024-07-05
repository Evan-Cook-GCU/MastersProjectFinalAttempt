import { Component, OnInit } from '@angular/core';
import { Group } from '../../Models/Models';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { StorageService } from '../../services/storage/storage.service';
import { ButtonModule } from 'primeng/button';
import { GroupMembershipService } from '../../services/DataServices/group-membership.service';
import { GroupService } from '../../services/DataServices/group.service';
import { UserService } from '../../services/DataServices/user.service';
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
    this.groupService.getGroups().subscribe(data => {
      this.groups = data;
      this.filteredGroups = this.groups;
    })
    
  }

  onSearch(event: any): void {
    const query = event.target.value.toLowerCase();
    this.filteredGroups = this.groups.filter(group =>
      group.groupName.toLowerCase().includes(query) ||
      group.description.toLowerCase().includes(query)
    );
  }

  onViewGroup(group: Group): void {
    this.router.navigate(['/group-viewer', group.groupId]);
    
  }

  
}