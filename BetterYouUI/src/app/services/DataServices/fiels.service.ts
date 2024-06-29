import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Field, baseUrl } from '../../Models/Models';

@Injectable({
  providedIn: 'root'
})
export class FieldService {

  constructor(private http: HttpClient) { }

  getFieldsByMetricId(metricId: number): Observable<Field[]> {
    return this.http.get<Field[]>(`${baseUrl}api/fields/metric/${metricId}`);
  }
}
