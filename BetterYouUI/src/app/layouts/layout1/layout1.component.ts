import { Component } from '@angular/core';
import { GraphComponent } from '../../GraphComponent/graph/graph.component';
import { MetricsComponent } from '../../MetricsComponent/metrics/metrics.component';

@Component({
  selector: 'app-layout1',
  standalone: true,
  imports: [GraphComponent, MetricsComponent],
  templateUrl: './layout1.component.html',
  styleUrl: './layout1.component.scss'
})
export class Layout1Component {

}
