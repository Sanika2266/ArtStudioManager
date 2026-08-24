import { Component, OnInit } from '@angular/core';
import { Artwork } from '../../../shared/models/artwork.model';
import { Category } from '../../../shared/models/category.model';
import { PriceList, SizeType } from '../../../shared/models/pricelist.model';
import { ArtworkService } from '../../../core/services/artwork.service';
import { CategoryService } from '../../../core/services/category.service';
import { PriceListService } from '../../../core/services/price-list.service';
import { environment } from '../../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InquiryService } from '../../../core/services/inquiry.service';
import { UploadService } from '../../../core/services/upload.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  artworks: Artwork[] = [];
  categories: Category[] = [];
  priceLists: PriceList[] = [];
  loading = true;
  inquiryForm: FormGroup;
  submittingInquiry = false;
  inquirySubmitted = false;
  inquiryError: string | null = null;
  referenceImagePreview: string | null = null;
  uploadingReference = false;

  apiBaseUrl = environment.apiUrl;

  constructor(
    private artworkService: ArtworkService,
    private categoryService: CategoryService,
    private priceListService: PriceListService,
    private inquiryService: InquiryService,
    private uploadService: UploadService,
    private fb: FormBuilder
  ) {
    this.inquiryForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      artworkType: [''],
      preferredSize: [''],
      description: [''],
      referenceImageUrl: [''],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Failed to load categories', err)
    });

    this.artworkService.getAll().subscribe({
      next: (data) => {
        this.artworks = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load artworks', err);
        this.loading = false;
      }
    });

    this.priceListService.getAll().subscribe({
      next: (data) => this.priceLists = data,
      error: (err) => console.error('Failed to load prices', err)
    });
  }

  getPricesForCategory(categoryId: number): PriceList[] {
    return this.priceLists.filter(p => p.categoryId === categoryId);
  }

  getSizeLabel(size: SizeType): string {
    return size === SizeType.A4 ? 'A4' : 'A3';
  }
  onReferenceFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];

    const reader = new FileReader();
    reader.onload = () => this.referenceImagePreview = reader.result as string;
    reader.readAsDataURL(file);

    this.uploadingReference = true;
    this.uploadService.uploadImage(file).subscribe({
      next: (res) => {
        this.inquiryForm.patchValue({ referenceImageUrl: res.imageUrl });
        this.uploadingReference = false;
      },
      error: (err) => {
        console.error('Reference upload failed', err);
        this.uploadingReference = false;
      }
    });
  }

onSubmitInquiry(): void {
  if (this.inquiryForm.invalid) {
    this.inquiryForm.markAllAsTouched();
    return;
  }

  if (this.uploadingReference) {
    this.inquiryError = 'Please wait for the image to finish uploading.';
    return;
  }

  this.submittingInquiry = true;
  this.inquiryError = null;

  this.inquiryService.create(this.inquiryForm.value).subscribe({
    next: () => {
      this.inquirySubmitted = true;
      this.submittingInquiry = false;
      this.inquiryForm.reset();
      this.referenceImagePreview = null;
    },
    error: (err) => {
      console.error('Failed to submit inquiry', err);
      this.inquiryError = 'Something went wrong. Please try again.';
      this.submittingInquiry = false;
    }
  });
}
}