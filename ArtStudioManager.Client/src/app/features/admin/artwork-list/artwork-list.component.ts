import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Artwork } from '../../../shared/models/artwork.model';
import { Category } from '../../../shared/models/category.model';
import { ArtworkService } from '../../../core/services/artwork.service';
import { CategoryService } from '../../../core/services/category.service';
import { UploadService } from '../../../core/services/upload.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-artwork-list',
  templateUrl: './artwork-list.component.html',
  styleUrls: ['./artwork-list.component.css']
})
export class ArtworkListComponent implements OnInit {
  artworks: Artwork[] = [];
  categories: Category[] = [];
  loading = true;
  error: string | null = null;

  artworkForm: FormGroup;
  submitting = false;
  editingId: number | null = null;
  deletingId: number | null = null;

  // Image upload state
  selectedFile: File | null = null;
  imagePreviewUrl: string | null = null;
  uploading = false;
  uploadError: string | null = null;

  // apiBaseUrl = 'https://localhost:44303'; 
  apiBaseUrl = environment.apiUrl;

  constructor(
    private artworkService: ArtworkService,
    private categoryService: CategoryService,
    private uploadService: UploadService,
    private fb: FormBuilder
  ) {
    this.artworkForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      price: [null, [Validators.required, Validators.min(0)]],
      dimensions: [''],
      medium: [''],
      isAvailable: [true],
      categoryId: [null, Validators.required],
      imageUrl: ['']
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadArtworks();
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Failed to load categories', err)
    });
  }

  loadArtworks(): void {
    this.loading = true;
    this.artworkService.getAll().subscribe({
      next: (data) => {
        this.artworks = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load artworks', err);
        this.error = 'Could not load artworks. Is the API running?';
        this.loading = false;
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];

    // Basic client-side validation (server also validates — never trust client-only)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      this.uploadError = 'Only JPG, PNG, or WEBP images are allowed.';
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      this.uploadError = 'Image must be under 5MB.';
      return;
    }

    this.uploadError = null;
    this.selectedFile = file;

    // Show a local preview immediately, before uploading
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviewUrl = reader.result as string;
    };
    reader.readAsDataURL(file);

    // Upload right away, store the returned URL for when we submit the form
    this.uploading = true;
    this.uploadService.uploadImage(file).subscribe({
      next: (res) => {
        this.artworkForm.patchValue({ imageUrl: res.imageUrl });
        this.uploading = false;
      },
      error: (err) => {
        console.error('Upload failed', err);
        this.uploadError = 'Upload failed. Try a different image.';
        this.uploading = false;
      }
    });
  }

  removeImage(): void {
    this.selectedFile = null;
    this.imagePreviewUrl = null;
    this.artworkForm.patchValue({ imageUrl: '' });
  }

  onSubmit(): void {
    if (this.artworkForm.invalid) {
      this.artworkForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const payload = this.artworkForm.value;

    if (this.editingId) {
      this.artworkService.update(this.editingId, payload).subscribe({
        next: () => {
          this.resetForm();
          this.submitting = false;
          this.loadArtworks();
        },
        error: (err) => {
          console.error('Failed to update artwork', err);
          this.submitting = false;
        }
      });
    } else {
      this.artworkService.create(payload).subscribe({
        next: () => {
          this.resetForm();
          this.submitting = false;
          this.loadArtworks();
        },
        error: (err) => {
          console.error('Failed to create artwork', err);
          this.submitting = false;
        }
      });
    }
  }

  startEdit(artwork: Artwork): void {
    this.editingId = artwork.id;
    this.artworkForm.patchValue({
      title: artwork.title,
      description: artwork.description,
      price: artwork.price,
      dimensions: artwork.dimensions,
      medium: artwork.medium,
      isAvailable: artwork.isAvailable,
      categoryId: artwork.categoryId,
      imageUrl: artwork.imageUrl
    });
    this.imagePreviewUrl = artwork.imageUrl ? `${this.apiBaseUrl}${artwork.imageUrl}` : null;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  resetForm(): void {
    this.editingId = null;
    this.artworkForm.reset({ isAvailable: true });
    this.selectedFile = null;
    this.imagePreviewUrl = null;
    this.uploadError = null;
  }

  deleteArtwork(artwork: Artwork): void {
    const confirmed = confirm(`Delete "${artwork.title}"? This cannot be undone.`);
    if (!confirmed) return;

    this.deletingId = artwork.id;
    this.artworkService.delete(artwork.id).subscribe({
      next: () => {
        this.deletingId = null;
        this.loadArtworks();
      },
      error: (err) => {
        console.error('Failed to delete artwork', err);
        this.deletingId = null;
        alert('Could not delete this artwork.');
      }
    });
  }

  getCategoryName(categoryId: number): string {
    return this.categories.find(c => c.id === categoryId)?.name ?? 'Uncategorized';
  }
}