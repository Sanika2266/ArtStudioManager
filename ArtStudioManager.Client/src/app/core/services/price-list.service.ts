import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PriceList } from '../../shared/models/pricelist.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PriceListService {
  // private apiUrl = 'https://localhost:44303/api/pricelists';
  private apiUrl = `${environment.apiUrl}/api/pricelists`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<PriceList[]> {
    return this.http.get<PriceList[]>(this.apiUrl);
  }

  create(priceList: PriceList): Observable<PriceList> {
    return this.http.post<PriceList>(this.apiUrl, priceList);
  }

  update(id: number, priceList: PriceList): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, priceList);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}