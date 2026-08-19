import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artwork } from '../../shared/models/artwork.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArtworkService {
  // private apiUrl = 'https://localhost:44303/api/artworks';
  private apiUrl = `${environment.apiUrl}/api/artworks`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Artwork[]> {
    return this.http.get<Artwork[]>(this.apiUrl);
  }

  getById(id: number): Observable<Artwork> {
    return this.http.get<Artwork>(`${this.apiUrl}/${id}`);
  }

  create(artwork: Artwork): Observable<Artwork> {
    return this.http.post<Artwork>(this.apiUrl, artwork);
  }

  update(id: number, artwork: Artwork): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, artwork);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}