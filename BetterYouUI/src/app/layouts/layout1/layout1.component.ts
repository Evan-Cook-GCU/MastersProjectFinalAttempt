import { Component } from '@angular/core';
import { GraphComponent } from '../../GraphComponent/graph/graph.component';
import { MatTabsModule } from '@angular/material/tabs';  // Import MatTabsModule
import { MatCardModule } from '@angular/material/card';
import { MetricBuilderComponent } from "../../MetricsComponent/metric-builder/metric-builder.component";
import { MetricListerComponent } from "../../MetricsComponent/metric-lister/metric-lister.component";
import { MetricsListComponent } from "../../metrics-list/metrics-list.component";  // Import MatCardModule

@Component({
    selector: 'app-layout1',
    standalone: true, // Include MatCardModule in the imports array
    templateUrl: './layout1.component.html',
    styleUrl: './layout1.component.scss',
    imports: [GraphComponent, MatTabsModule, MatCardModule, MetricBuilderComponent, MetricListerComponent, MetricsListComponent]
})
export class Layout1Component { }
