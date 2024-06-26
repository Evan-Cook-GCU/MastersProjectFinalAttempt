import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { GraphComponent } from '../../GraphComponent/graph/graph.component';
import { MetricBuilderComponent } from '../../MetricsComponent/metric-builder/metric-builder.component';
import { MetricListerComponent } from '../../MetricsComponent/metric-lister/metric-lister.component';
import { MetricsListComponent } from '../../metrics-list/metrics-list.component';
import { ActivatedRoute } from '@angular/router';
import { Group, Metric } from '../../Models/Models';
import { GroupService } from '../../services/DataServices/GroupMock/group.service';
import { MetricService } from '../../services/DataServices/MetricService/metric.service';
import { GroupMembershipService } from '../../services/DataServices/GroupMembershipMock/group-membership.service';


@Component({
  selector: 'app-admin-group-editor',
  standalone: true,
  imports: [GraphComponent, MatTabsModule, MatCardModule, MetricBuilderComponent, MetricListerComponent, MetricsListComponent],
  templateUrl: './admin-group-editor.component.html',
  styleUrl: './admin-group-editor.component.scss'
})
export class AdminGroupEditorComponent implements OnInit {
  group: Group | null = null;
  metrics: Metric[] = [];
  userMetricData: Metric[] = [];

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService,
    private metricService: MetricService,
    private groupMembershipService: GroupMembershipService
  ) {}

  ngOnInit(): void {
    const groupId = parseInt(this.route.snapshot.paramMap.get('groupId')!, 10);
    this.group = this.groupService.getGroupById(groupId);
    if (this.group) {
      this.metrics = this.metricService.getMetrics().filter(metric => metric.groupId === groupId);
      const membership = this.groupMembershipService.getGroupMemberships().find(m => m.groupId === groupId);
      if (membership) {
        this.userMetricData = this.metricService.getMetrics().filter(metric => metric.metricId === membership.groupId);
      }
    }
  }
}