import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Metric } from '../../Models/Models';

@Injectable({
  providedIn: 'root'
})
export class MetricService {

  private metricSubject = new BehaviorSubject<Metric[]>([]);
  private metrics: Metric[] = [];

  metric$ = this.metricSubject.asObservable();

  updateMetricData(data: Metric[]): void {
    this.metrics = data;
    this.metricSubject.next(this.metrics);
  }

  addMetric(metric: Metric): void {
    this.metrics.push(metric);
    this.metricSubject.next(this.metrics);
  }

  getMetrics(): Metric[] {
    return this.metrics;
  }

  updateMetric(updatedMetric: Metric): void {
    const index = this.metrics.findIndex(m => m.metricId === updatedMetric.metricId);
    if (index !== -1) {
      this.metrics[index] = updatedMetric;
      this.metricSubject.next(this.metrics);
    }
  }
}
