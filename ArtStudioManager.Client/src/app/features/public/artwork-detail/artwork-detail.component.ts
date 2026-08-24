import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Artwork } from '../../../shared/models/artwork.model';
import { ArtworkService } from '../../../core/services/artwork.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-artwork-detail',
  templateUrl: './artwork-detail.component.html',
  styleUrls: ['./artwork-detail.component.css']
})
export class ArtworkDetailComponent implements OnInit {
  artwork: Artwork | null = null;
  loading = true;
  notFound = false;
  apiBaseUrl = environment.apiUrl;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private artworkService: ArtworkService
  ) {}

  ngOnInit(): void {
    // Grabs the ':id' segment from the current URL, e.g. "3" from /artwork/3
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;

    if (!id) {
      this.notFound = true;
      this.loading = false;
      return;
    }

    this.artworkService.getById(id).subscribe({
      next: (data) => {
        this.artwork = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load artwork', err);
        this.notFound = true;
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/'], { fragment: 'gallery' });
  }
}