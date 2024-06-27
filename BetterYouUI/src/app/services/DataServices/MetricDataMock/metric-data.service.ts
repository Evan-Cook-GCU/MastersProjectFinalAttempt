import { Injectable } from '@angular/core';
import { MetricData } from '../../../Models/Models';
import { MOCK_METRIC_DATA } from '../mock-data/mock-data';

@Injectable({
  providedIn: 'root'
})
export class MetricDataService {
  private metricData: MetricData[] = MOCK_METRIC_DATA;

  constructor() { }

  getMetricData(): MetricData[] {
    return this.metricData;
  }

  getMetricDataById(metricDataId: number): MetricData | null {
    return this.metricData.find(d => d.metricDataId === metricDataId) || null;
  }

  addMetricData(data: MetricData): void {
    this.metricData.push(data);
  }

  updateMetricData(updatedData: MetricData): void {
    const index = this.metricData.findIndex(d => d.metricDataId === updatedData.metricDataId);
    if (index !== -1) {
      this.metricData[index] = updatedData;
    }
  }

  deleteMetricData(metricDataId: number): void {
    this.metricData = this.metricData.filter(d => d.metricDataId !== metricDataId);
  }
}
