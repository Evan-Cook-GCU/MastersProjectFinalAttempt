import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { GraphComponent } from '../../GraphComponent/graph/graph.component';
import { MetricBuilderComponent } from '../../MetricsComponent/metric-builder/metric-builder.component';
import { MetricListerComponent } from '../../MetricsComponent/metric-lister/metric-lister.component';
import { MetricsListComponent } from '../../metrics-list/metrics-list.component';
import { GroupMembershipService, MetricService, GroupService, UserService } from '../../services/ApiCalls/ApiCalls';
import { ActivatedRoute } from '@angular/router';
import { Group, Metric, User } from '../../Models/Models';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-user-group-view',
  standalone: true,
  imports: [CommonModule,GraphComponent, MatTabsModule, MatCardModule, MetricBuilderComponent, MetricListerComponent, MetricsListComponent],
  templateUrl: './user-group-view.component.html',
  styleUrl: './user-group-view.component.scss'
})
export class UserGroupViewComponent {
  group: Group | null = null;
  metrics: Metric[] = [];
  userMetricData: Metric[] = [];
  groupMembers: User[] = [];
  selectedUserId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService,
    private metricService: MetricService,
    private groupMembershipService: GroupMembershipService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const groupId = parseInt(this.route.snapshot.paramMap.get('groupId')!, 10);
    this.loadGroup(groupId);
  }

  private loadGroup(groupId: number): void {
    this.groupService.get(groupId).subscribe(group => {
      this.group = group;
      if (this.group) {
        this.loadMetrics(groupId);
        this.loadGroupMembers(groupId);
      }
    });
  }

  private loadMetrics(groupId: number): void {
    this.metricService.getAll().subscribe(metrics => {
      this.metrics = metrics.filter(metric => metric.groupId === groupId);
    });
  }

  private loadGroupMembers(groupId: number): void {
    this.userService.getAll().subscribe(users => {
      this.groupMembershipService.getAll().subscribe(memberships => {
        this.groupMembers = users.filter(user => 
          memberships.some(m => m.groupId === groupId && m.userId === user.userId)
        );
      });
    });
  }

  onMemberChange(event: any): void {
    this.selectedUserId = parseInt(event.target.value, 10);
    if (this.group) {
      this.loadUserMetricData(this.group.groupId, this.selectedUserId);
    }
  }

  private loadUserMetricData(groupId: number, userId: number): void {
    this.groupMembershipService.getAll().subscribe(memberships => {
      const membership = memberships.find(m => m.groupId === groupId && m.userId === userId);
      if (membership) {
        this.metricService.getAll().subscribe(metrics => {
          this.userMetricData = metrics.filter(metric => 
            membership.metricData.some((md: { metricId: any; }) => md.metricId === metric.metricId)
          );
        });
      }
    });
  }
}
