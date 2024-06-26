import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Metric, MetricData } from '../../../Models/Models';

@Injectable({
  providedIn: 'root'
})
export class MetricService {

  private metricSubject = new BehaviorSubject<Metric[]>([]);

  private metrics: Metric[] = [
    {
      metricId: 1,
      Name: 'Performance',
      fields: [{ Label: 'Score', Type: 'number' }],
      data: [],
      groupId: 1
    },
    {

      metricId: 2,
      Name: 'Attendance',
      fields: [{ Label: 'Days Present', Type: 'number' }],
      data: [],
      groupId: 2
    }

  ];
  metric$ = this.metricSubject.asObservable();

  constructor() {
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
