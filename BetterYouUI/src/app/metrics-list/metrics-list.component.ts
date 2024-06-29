import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Group, Metric, VALID_FIELD_TYPES } from '../Models/Models';
import { CommonModule } from '@angular/common';
import { MetricService } from '../services/DataServices/metric.service';

@Component({
  selector: 'app-metrics-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './metrics-list.component.html',
  styleUrl: './metrics-list.component.scss'
})
export class MetricsListComponent implements OnInit {
 
  @Input() metrics: Metric[] = [];
  
  constructor(private metricService: MetricService) { }

  ngOnInit(): void {
    this.loadMetricFields();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['metrics']) {
      this.loadMetricFields();
    }
  }

  private loadMetricFields(): void {
    this.metrics.forEach(metric => {
      this.metricService.getMetricFields(metric.metricId).subscribe(fields => {
        metric.fields = fields;
      });
    });
  }

  getFieldType(type: string): string {
    return VALID_FIELD_TYPES.includes(type) ? type : 'text';
  }
}