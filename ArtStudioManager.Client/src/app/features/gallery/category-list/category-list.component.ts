import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../../shared/models/category.model';
import { CategoryService } from '../../../core/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  loading = true;
  error: string | null = null;

  categoryForm: FormGroup;
  submitting = false;

  editingId: number | null = null; // null = creating, set = editing that category
  deletingId: number | null = null; // tracks which delete button is mid-request

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.loading = true;
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load categories', err);
        this.error = 'Could not load categories. Is the API running?';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    this.submitting = true;

    if (this.editingId) {
      // UPDATE mode
      this.categoryService.update(this.editingId, this.categoryForm.value).subscribe({
        next: () => {
          this.cancelEdit();
          this.submitting = false;
          this.loadCategories();
        },
        error: (err) => {
          console.error('Failed to update category', err);
          this.submitting = false;
        }
      });
    } else {
      // CREATE mode
      this.categoryService.create(this.categoryForm.value).subscribe({
        next: () => {
          this.categoryForm.reset();
          this.submitting = false;
          this.loadCategories();
        },
        error: (err) => {
          console.error('Failed to create category', err);
          this.submitting = false;
        }
      });
    }
  }

  startEdit(category: Category): void {
    this.editingId = category.id;
    this.categoryForm.patchValue({
      name: category.name,
      description: category.description
    });
    // Scroll to form so the user sees it's now in edit mode
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelEdit(): void {
    this.editingId = null;
    this.categoryForm.reset();
  }

  deleteCategory(category: Category): void {
    const confirmed = confirm(`Delete "${category.name}"? This cannot be undone.`);
    if (!confirmed) return;

    this.deletingId = category.id;
    this.categoryService.delete(category.id).subscribe({
      next: () => {
        this.deletingId = null;
        this.loadCategories();
      },
      error: (err) => {
        console.error('Failed to delete category', err);
        this.deletingId = null;
        alert('Could not delete this category — it may still have artworks linked to it.');
      }
    });
  }
}