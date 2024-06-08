import { Component } from '@angular/core';
import { GraphComponent } from '../../GraphComponent/graph/graph.component';
import { MetricsComponent } from '../../MetricsComponent/metrics/metrics.component';
import { MatTabsModule } from '@angular/material/tabs';  // Import MatTabsModule
import { MatCardModule } from '@angular/material/card';  // Import MatCardModule

@Component({
  selector: 'app-layout1',
  standalone: true,
  imports: [GraphComponent, MetricsComponent, MatTabsModule, MatCardModule],  // Include MatCardModule in the imports array
  templateUrl: './layout1.component.html',
  styleUrl: './layout1.component.scss'
})
export class Layout1Component { }
