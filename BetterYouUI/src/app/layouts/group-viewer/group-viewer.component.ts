import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { GraphComponent } from '../../GraphComponent/graph/graph.component';
import { MetricBuilderComponent } from '../../MetricsComponent/metric-builder/metric-builder.component';
import { MetricListerComponent } from '../../MetricsComponent/metric-lister/metric-lister.component';
import { MetricsListComponent } from '../../metrics-list/metrics-list.component';
import { ActivatedRoute } from '@angular/router';
import { Group, GroupMembership, Metric, MetricData, User } from '../../Models/Models';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/DataServices/user.service';
import { GroupMembershipService } from '../../services/DataServices/group-membership.service';
import { MetricService } from '../../services/DataServices/metric.service';
import { GroupService } from '../../services/DataServices/group.service';
import { MetricDataService } from '../../services/DataServices/metric-data.service';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MembershipManagementComponent } from '../../Components/membership-management/membership-management.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ChatComponent } from "../../Components/chat/chat.component";
@Component({
  selector: 'app-group-viewer',
  standalone: true,
  imports: [CommonModule, GraphComponent, MatTabsModule, MatCardModule, MetricBuilderComponent, MetricListerComponent,
    MetricsListComponent, MembershipManagementComponent, ChatComponent],
  templateUrl: './group-viewer.component.html',
  styleUrl: './group-viewer.component.scss'
})
export class GroupViewerComponent implements OnInit {
  group: Group | null = null;
  metrics: Metric[] = [];
  userMetricData: MetricData[] = [];
  groupMembers: User[] = [];
  selectedUserId: number | null = null;
  loggedInUser: User | null = null;
  membership: GroupMembership | null = null;
  membershipsLoaded:boolean=false;
  private eventSubscription: Subscription|undefined;
  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService,
    private metricService: MetricService,
    private groupMembershipService: GroupMembershipService,
    private userService: UserService,
    private metricdataService: MetricDataService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    //steps
    //1. Get the groupId from the URL
    const groupId = parseInt(this.route.snapshot.paramMap.get('groupId')!, 10);
    
    //2. get logged in user
    this.loggedInUser = this.userService.getLoggedInUser();
    //3. chech if the user is a member of the group
    if (this.loggedInUser) {
      this.groupMembershipService.getMembership(this.loggedInUser.userId, groupId).subscribe(membership => {
        this.membership = membership;
        this.membershipsLoaded=true;
      });
    }
    //4. load the group data
    this.groupService.getGroupById(groupId).subscribe(group => {
      this.group = group;
    });
    this.metricService.getMetricsByGroupId(groupId).subscribe(metrics => {
      this.metrics = metrics;
    }
    );
    this.userService.getGroupMembers(groupId).subscribe(groupMembers => {
      this.groupMembers = groupMembers;
      this.selectedUserId = groupMembers[0].userId;
    });
    this.eventSubscription = this.metricService.event$.subscribe(() => {
      this.updateMetrics();
    });
    
  }
  updateMetrics(): void {
    if (this.group) {
      this.metricService.getMetricsByGroupId(this.group.groupId).subscribe(metrics => {
        this.metrics = metrics;
        if(this.group){
          this.group.metrics=metrics;
        }
      });
    }
  }
  isMember(user: User|null): boolean {
    if (!user) {
      return false;
    }
    return this.groupMembers.some(u => u.userId === user.userId);
  }
  onMemberChange(event: any): void {
    this.selectedUserId = parseInt(event.target.value, 10);
    if (this.group) {
      this.loadUserMetricData(this.group.groupId, this.selectedUserId);
    }
  }

  private loadUserMetricData(groupId: number, userId: number): void {
    this.metrics.forEach(data => {
      this.metricdataService.getUsersDataForMetric(data.metricId, userId).subscribe(userMetricData => {
        data.data = userMetricData;
        data.data.forEach(d => {
          
        });
        })
      });
    }
    toggleMembership(): void {
      if (this.membership) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          data: {
            message: 'Are you sure you want to quit the group?'
          }
        });
  
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            if (this.membership) {
            this.groupMembershipService.deleteGroupMembership(this.membership.membershipId).subscribe(() => {
              this.membership = null;
            });
          }
          }
        });
      } else if (this.loggedInUser && this.group) {
        const newMembership: GroupMembership = {
          membershipId: 0,
          userId: this.loggedInUser.userId,
          groupId: this.group.groupId,
          isAdmin: false,
          isBanned: false,
          joinedAt: new Date(),
          metricData: []
        };
        this.groupMembershipService.addGroupMembership(newMembership).subscribe(membership => {
          this.membership = membership;
          this.loggedInUser=this.loggedInUser;
        });
      }
    }
}
