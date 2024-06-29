import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Metric } from '../../Models/Models';
import { MetricPopulatorComponent } from "../metric-populator/metric-populator.component";
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { MetricService } from '../../services/DataServices/metric.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-metric-lister',
  standalone: true,
  templateUrl: './metric-lister.component.html',
  styleUrl: './metric-lister.component.scss',
  imports: [MetricPopulatorComponent, CommonModule, ReactiveFormsModule, TableModule, ButtonModule, InputTextModule, CalendarModule, FormsModule]
})
export class MetricListerComponent {
  @Input() metrics: Metric[] = [];

  private eventSubscription: Subscription;
  constructor(private formBuilder: FormBuilder, private metricService: MetricService) {
    this.eventSubscription = this.metricService.event$.subscribe(() => {
      this.updateMetrics();
    });
  }

  updateMetrics() {
    if (this.metrics[0].groupId) {
        this.metricService.getMetricsByGroupId(this.metrics[0].groupId).subscribe(metrics => {
        this.metrics = metrics;
      });
    }
  }
}