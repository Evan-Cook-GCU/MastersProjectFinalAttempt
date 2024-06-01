import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MetricData } from '../../Models/Models';

@Injectable({
  providedIn: 'root',
})
export class MetricDataService {
  private metricDataSubject = new BehaviorSubject<MetricData[]>([]);
  metricData$ = this.metricDataSubject.asObservable();

  updateMetricData(data: MetricData[]): void {
    this.metricDataSubject.next(data);
  }
}