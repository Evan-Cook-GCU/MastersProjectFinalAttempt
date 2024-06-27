import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Metric, MetricData } from '../../../Models/Models';
import { MOCK_METRICS } from '../mock-data/mock-data';

@Injectable({
  providedIn: 'root'
})
export class MetricService {

  private metricSubject = new BehaviorSubject<Metric[]>(MOCK_METRICS);
  metric$ = this.metricSubject.asObservable();

  private metrics: Metric[] = MOCK_METRICS;

  constructor() {
    //localStorage.clear();
    this.loadState();
    this.metricSubject.next(this.metrics);
  }

  updateMetricData(data: Metric[]): void {
    this.metrics = data;
    this.metricSubject.next(this.metrics);
    this.saveState();
  }

  addMetric(metric: Metric): void {
    metric.metricId = this.metrics.length + 1;
    this.metrics.push(metric);
    this.metricSubject.next(this.metrics);
    this.saveState();
  }

  getMetrics(): Metric[] {
    return this.metrics;
  }

  updateMetric(updatedMetric: Metric): void {
    const index = this.metrics.findIndex(m => m.metricId === updatedMetric.metricId);
    if (index !== -1) {
      this.metrics[index] = updatedMetric;
      this.metricSubject.next(this.metrics);
      this.saveState();
    }
  }

  addMetricData(metricId: number, metricData: MetricData): void {
    const metric = this.metrics.find(m => m.metricId === metricId);
    if (metric) {
      if (!metric.data) {
        metric.data = [];
      }
      metric.data.push(metricData);
      this.metricSubject.next(this.metrics);
      this.saveState();
    }
  }

  updateMetricDataList(metricId: number, metricData: MetricData[]): void {
    const metric = this.metrics.find(m => m.metricId === metricId);
    if (metric) {
      if (!metric.data) {
        metric.data = [];
      }
      metric.data = metricData;
      this.metricSubject.next(this.metrics);
      this.saveState();
    }
  }

  removeMetricData(metricId: number, metricDataId: number): void {
    const metric = this.metrics.find(m => m.metricId === metricId);
    if (metric) {
      metric.data = metric.data.filter(d => d.metricDataId !== metricDataId);
      this.metricSubject.next(this.metrics);
      this.saveState();
    }
  }

  private saveState() {
    localStorage.setItem('metrics', JSON.stringify(this.metrics));
  }

  private loadState() {
    const savedMetrics = localStorage.getItem('metrics');
    if (savedMetrics) {
      this.metrics = JSON.parse(savedMetrics);
    }
   
  }
  
}
