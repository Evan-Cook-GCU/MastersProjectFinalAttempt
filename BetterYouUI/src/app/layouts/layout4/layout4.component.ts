import { Component } from '@angular/core';
import { GraphComponent } from "../../GraphComponent/graph/graph.component";
import { MetricsComponent } from "../../MetricsComponent/metrics/metrics.component";

@Component({
    selector: 'app-layout4',
    standalone: true,
    templateUrl: './layout4.component.html',
    styleUrl: './layout4.component.scss',
    imports: [GraphComponent, MetricsComponent]
})
export class Layout4Component {

}
