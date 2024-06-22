import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Metric, MetricData2 } from '../../Models/Models';

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
    // Generate a unique ID for the metric
    metric.metricId = this.metrics.length + 1;
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
  addMetricData(metricId: number, metricData: MetricData2): void {
    const metric = this.metrics.find(m => m.metricId === metricId);
    if (metric) {
      if (!metric.data) {
        metric.data = []; // Initialize data if undefined
      }
      metric.data.push(metricData);
      this.metricSubject.next(this.metrics);
    }
  }
  updateMetricDataList(metricId: number, metricData: MetricData2[]): void {
    const metric = this.metrics.find(m => m.metricId === metricId);
    if (metric) {
      if (!metric.data) {
        metric.data = []; // Initialize data if undefined
      }
      metric.data = metricData;
      this.metricSubject.next(this.metrics);
    }
  }

  removeMetricData(metricId: number, metricDataId: number): void {
    const metric = this.metrics.find(m => m.metricId === metricId);
    if (metric) {
      metric.data = metric.data.filter(d => d.metricDataId !== metricDataId);
      this.metricSubject.next(this.metrics);
    }
  }
}
