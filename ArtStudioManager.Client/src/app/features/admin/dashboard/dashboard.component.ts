import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ArtworkService } from '../../../core/services/artwork.service';
import { CategoryService } from '../../../core/services/category.service';
import { InquiryService } from '../../../core/services/inquiry.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loading = true;

  totalArtwork = 0;
  availableArtwork = 0;
  totalCategories = 0;
  totalInquiries = 0;
  newInquiries = 0;

  constructor(
    private artworkService: ArtworkService,
    private categoryService: CategoryService,
    private inquiryService: InquiryService
  ) { }

  ngOnInit(): void {
    // Run all three requests in parallel, wait for all to finish before updating the UI
    forkJoin({
      artworks: this.artworkService.getAll(),
      categories: this.categoryService.getAll(),
      inquiries: this.inquiryService.getAll()
    }).subscribe({
      next: ({ artworks, categories, inquiries }) => {
        this.totalArtwork = artworks.length;
        this.availableArtwork = artworks.filter(a => a.isAvailable).length;
        this.totalCategories = categories.length;
        this.totalInquiries = inquiries.length;
        this.newInquiries = inquiries.filter(i => i.status === 0).length; // 0 = New
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load dashboard stats', err);
        this.loading = false;
      }
    });
  }
}