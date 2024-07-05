import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Field, Metric, MetricData, baseUrl } from '../../Models/Models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MetricService {

  private eventSubject = new Subject<string>();

  event$ = this.eventSubject.asObservable();

  emitEvent(data: string) {
    this.eventSubject.next(data);
  }
  constructor(private http: HttpClient) { 
 
  }
  getMetric(metricId: number):Observable< Metric> {
    if (metricId == 0) {
      return new Observable<Metric>();
    }
    return this.http.get<Metric>(baseUrl + 'api/metrics/' + metricId);
  
  }
  getMetricsByGroupId(groupId: number):Observable< Metric[]> {
    return this.http.get<Metric[]>(baseUrl + 'api/groups/' + groupId+'/metrics');
  }
  getMetricFields(metricId: number):Observable< Field[]> {
    if (metricId == 0) {
      return new Observable<Field[]>();
    }
    return this.http.get<Field[]>(baseUrl + 'api/metrics/' + metricId+'/fields');
  }
  addMetric(metric: Metric): Observable<Metric> {
    return this.http.post<Metric>(baseUrl + 'api/metrics/' + metric.metricId,metric);
  }

  updateMetric(updatedMetric: Metric): Observable<Metric> {
    //to implement with api call
  
    return this.http.put<Metric>(baseUrl + 'api/metrics/' + updatedMetric.metricId,updatedMetric);
  }



  removeMetricData(metricDataId: number): Observable<any>  {
    return this.http.delete(baseUrl + 'api/metricdata/' + metricDataId);
  }


  
}
