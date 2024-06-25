import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { GraphComponent } from '../../GraphComponent/graph/graph.component';
import { MetricBuilderComponent } from '../../MetricsComponent/metric-builder/metric-builder.component';
import { MetricListerComponent } from '../../MetricsComponent/metric-lister/metric-lister.component';
import { MetricsListComponent } from '../../metrics-list/metrics-list.component';

@Component({
  selector: 'app-admin-group-editor',
  standalone: true,
  imports: [GraphComponent, MatTabsModule, MatCardModule, MetricBuilderComponent, MetricListerComponent, MetricsListComponent],
  templateUrl: './admin-group-editor.component.html',
  styleUrl: './admin-group-editor.component.scss'
})
export class AdminGroupEditorComponent {

}
