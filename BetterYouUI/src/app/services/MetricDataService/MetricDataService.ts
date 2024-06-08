import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MetricData } from '../../Models/Models';

@Injectable({
  providedIn: 'root',
})
export class MetricDataService {
  private metricDataSubject = new BehaviorSubject<MetricData[]>([]);
  private weightLabelSubject = new BehaviorSubject<string>('Weight');
  private repsLabelSubject = new BehaviorSubject<string>('Reps');

  metricData$ = this.metricDataSubject.asObservable();
  weightLabel$ = this.weightLabelSubject.asObservable();
  repsLabel$ = this.repsLabelSubject.asObservable();

  updateMetricData(data: MetricData[]): void {
    this.metricDataSubject.next(data);
  }

  updateMetric2Label(label: string): void {
    this.weightLabelSubject.next(label);
  }

  updateMetric1Label(label: string): void {
    this.repsLabelSubject.next(label);
  }
}
