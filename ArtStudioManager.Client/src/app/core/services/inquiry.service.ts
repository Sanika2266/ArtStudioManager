import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inquiry, InquiryStatus } from '../../shared/models/inquiry.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InquiryService {
  private apiUrl = `${environment.apiUrl}/api/inquiries`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Inquiry[]> {
    return this.http.get<Inquiry[]>(this.apiUrl);
  }

  create(inquiry: Partial<Inquiry>): Observable<Inquiry> {
    return this.http.post<Inquiry>(this.apiUrl, inquiry);
  }

  updateStatus(id: number, status: InquiryStatus): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/status`, status);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}