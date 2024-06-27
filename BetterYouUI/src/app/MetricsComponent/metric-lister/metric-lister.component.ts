import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Metric } from '../../Models/Models';
import { MetricService } from '../../services/DataServices/MetricService/metric.service';
import { MetricPopulatorComponent } from "../metric-populator/metric-populator.component";
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-metric-lister',
    standalone: true,
    templateUrl: './metric-lister.component.html',
    styleUrl: './metric-lister.component.scss',
    imports: [MetricPopulatorComponent, CommonModule, ReactiveFormsModule, TableModule, ButtonModule, InputTextModule, CalendarModule, FormsModule]
})
export class MetricListerComponent {
  @Input() metrics: Metric[] = [];
  @Input() userMetricData: Metric[] = [];
  constructor(private formBuilder: FormBuilder, private metricService: MetricService) {
    this.metrics = this.metricService.getMetrics();
    this.metricService.metric$.subscribe(metrics => {
      this.metrics = metrics;
    });
  }
  getList() {
    console.log(this.metrics);
   // return this.metrics;
  }
  
}
