import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

export interface IData {
  id: string;
}

@Injectable({
  providedIn: 'root'
})

export class HttpRequestService {
  private readonly apiBaseUrl = 'API_BASE_URL'; // Replace 'API_BASE_URL' with the actual environment variable, e.g., environment.apiBaseUrl

  constructor(private http: HttpClient) { }

  /**
   * Fetches data with specific query parameters.
   * @param parameter1 - The first parameter to send as a query string.
   * @param parameter2 - The second parameter to send as a query string.
   * @returns An Observable of IData array.
   */
  getWithParams(parameter1: string, parameter2: string): Observable<IData[]> {
    let params = new HttpParams().set('parameter1Name', parameter1).set('parameter2Name', parameter2) .set('limit', '1');

    return this.http.get<IData[]>(`${this.apiBaseUrl}/endpointPath`, { params });
  }

  /**
   * Saves or updates data based on the isNew parameter.
   * @param data - The IData object to be saved or updated.
   * @param isNew - Determines whether to perform a POST or PUT request.
   * @returns An Observable of the response from the server.
   */
  saveForm(data: IData, isNew: boolean): Observable<any> {
    const endpointPath = `${this.apiBaseUrl}/endpointPath`; // Adjust 'endpointPath' as needed
    if (isNew) {
      return this.http.post(endpointPath, data);
    } else {
      return this.http.put(`${endpointPath}/${data.id}`, data); // Ensure the API supports URL parameter for PUT
    }
  }
}
