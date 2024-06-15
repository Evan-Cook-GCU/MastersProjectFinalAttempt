import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MetricData } from '../../Models/Models';

@Injectable({
  providedIn: 'root',
})
export class MetricDataService {
  private metricDataSubject = new BehaviorSubject<MetricData[]>([]);
  private labelsSubject = new BehaviorSubject<string[]>(['Metric 1', 'Metric 2']);

  metricData$ = this.metricDataSubject.asObservable();
  labels$ = this.labelsSubject.asObservable();

  updateMetricData(data: MetricData[]): void {
    this.metricDataSubject.next(data);
  }

  updateLabels(labels: string[]): void {
    this.labelsSubject.next(labels);
  }
}
