import { Injectable } from '@angular/core';
import { MetricData, baseUrl } from '../../Models/Models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class MetricDataService {
  private metricData: MetricData[] = [];

  constructor(private http:HttpClient) { }

  getMetricData(): MetricData[] {
    return this.metricData;
  }
  getUsersDataForMetric(metricId: number,userId:number): Observable<MetricData[]> {
    return this.http.get<MetricData[]>(baseUrl + 'api/metricdata/user/' + userId+'/metric/'+metricId);
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
  createMetricData(metricId: number, userId: number, label: string, value: number, date: string): Observable<MetricData> {
    // Create an object containing the parameters
    const params = {
      metricId: metricId,
      userId: userId,
      label: label,
      value: value,
      date: date
    };
    
   
    // Send the POST request with the parameters object in the body
    return this.http.post<MetricData>(`${baseUrl}api/metricdata/create`, params);
  }
}
