import { Component, OnInit } from '@angular/core';
import { Metric, VALID_FIELD_TYPES } from '../Models/Models';
import { MetricService } from '../services/DataServices/MetricService/metric.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-metrics-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './metrics-list.component.html',
  styleUrl: './metrics-list.component.scss'
})
export class MetricsListComponent implements OnInit {
  metrics: Metric[] = [];

  constructor(private metricService: MetricService) { }

  ngOnInit(): void {
    this.metricService.metric$.subscribe(metrics => {
      this.metrics = metrics.map(metric => ({
        ...metric,
        fields: metric.fields.map(field => ({
          ...field,
          Type: this.getFieldType(field.Type)
        }))
      }));
    });
  }

  getFieldType(type: string): string {
    return VALID_FIELD_TYPES.includes(type) ? type : 'text';
  }
}