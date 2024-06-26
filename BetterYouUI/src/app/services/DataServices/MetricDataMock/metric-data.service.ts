import { Injectable } from '@angular/core';
import { MetricData } from '../../../Models/Models';

@Injectable({
  providedIn: 'root'
})
export class MetricDataService {
  private metricData: MetricData[] = [
    {
      metricDataId: 1,
      metricId: 1,
      Name: 'John Doe Performance',
      fields: [{ Label: 'Score', Value: 85 }],
      date: new Date('2023-01-01T10:00:00Z'),
      groupMembershipId: 1
    },
    {
      metricDataId: 2,
      metricId: 2,
      Name: 'Jane Smith Attendance',
      fields: [{ Label: 'Days Present', Value: 20 }],
      date: new Date('2023-02-01T11:00:00Z'),
      groupMembershipId: 2
    }
  ];

  constructor() { }

  getMetricData(): MetricData[] {
    return this.metricData;
  }

  getMetricDataById(metricDataId: number): MetricData | null {
    const data = this.metricData.find(d => d.metricDataId === metricDataId);
    return data ? data : null;
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
