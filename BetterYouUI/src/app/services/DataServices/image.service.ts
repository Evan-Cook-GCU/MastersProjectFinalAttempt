import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private apiUrl = 'api/images';

  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file, file.name);
    return this.http.post(this.apiUrl, formData);
  }

  getImage(): Observable<string> {
    return this.http.get(`${this.apiUrl}/latest`, { responseType: 'text' });
  }
}
