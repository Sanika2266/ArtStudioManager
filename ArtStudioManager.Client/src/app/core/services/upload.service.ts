import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  // private apiUrl = 'https://localhost:44303/api/upload';
  private apiUrl = `${environment.apiUrl}/api/upload`;

  constructor(private http: HttpClient) { }

  uploadImage(file: File): Observable<{ imageUrl: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ imageUrl: string }>(`${this.apiUrl}/image`, formData);
  }
}