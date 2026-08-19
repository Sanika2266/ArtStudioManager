import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceList, SizeType } from '../../../shared/models/pricelist.model';
import { Category } from '../../../shared/models/category.model';
import { PriceListService } from '../../../core/services/price-list.service';
import { CategoryService } from '../../../core/services/category.service';

@Component({
  selector: 'app-price-list-manager',
  templateUrl: './price-list-manager.component.html',
  styleUrls: ['./price-list-manager.component.css']
})
export class PriceListManagerComponent implements OnInit {
  priceLists: PriceList[] = [];
  categories: Category[] = [];
  loading = true;
  error: string | null = null;

  form: FormGroup;
  submitting = false;
  editingId: number | null = null;
  deletingId: number | null = null;

  sizeOptions = [
    { label: 'A4', value: SizeType.A4 },
    { label: 'A3', value: SizeType.A3 }
  ];

  constructor(
    private priceListService: PriceListService,
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      categoryId: [null, Validators.required],
      size: [SizeType.A4, Validators.required],
      price: [null, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Failed to load categories', err)
    });
    this.loadPriceLists();
  }

  loadPriceLists(): void {
    this.loading = true;
    this.priceListService.getAll().subscribe({
      next: (data) => {
        this.priceLists = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load price lists', err);
        this.error = 'Could not load price lists. Is the API running?';
        this.loading = false;
      }
    });
  }

 onSubmit(): void {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  this.submitting = true;
  const payload = this.form.value;

  if (this.editingId) {
    this.priceListService.update(this.editingId, payload).subscribe({
      next: () => {
        this.resetForm();
        this.submitting = false;
        this.loadPriceLists();
      },
      error: (err: any) => {
        console.error('Failed to update price', err);
        this.submitting = false;
      }
    });
  } else {
    this.priceListService.create(payload).subscribe({
      next: () => {
        this.resetForm();
        this.submitting = false;
        this.loadPriceLists();
      },
      error: (err: any) => {
        console.error('Failed to create price', err);
        this.submitting = false;
      }
    });
  }
}
  startEdit(item: PriceList): void {
    this.editingId = item.id;
    this.form.patchValue({
      categoryId: item.categoryId,
      size: item.size,
      price: item.price
    });
  }

  resetForm(): void {
    this.editingId = null;
    this.form.reset({ size: SizeType.A4 });
  }

  deletePrice(item: PriceList): void {
    if (!confirm('Delete this price entry?')) return;
    this.deletingId = item.id;
    this.priceListService.delete(item.id).subscribe({
      next: () => {
        this.deletingId = null;
        this.loadPriceLists();
      },
      error: (err) => {
        console.error('Failed to delete price', err);
        this.deletingId = null;
      }
    });
  }

  getCategoryName(id: number): string {
    return this.categories.find(c => c.id === id)?.name ?? 'Unknown';
  }

  getSizeLabel(size: SizeType): string {
    return size === SizeType.A4 ? 'A4' : 'A3';
  }

  // Groups flat priceLists array by category, for the grouped display in the template
  get groupedByCategory(): { category: Category; prices: PriceList[] }[] {
    return this.categories
      .map(category => ({
        category,
        prices: this.priceLists.filter(p => p.categoryId === category.id)
      }))
      .filter(group => group.prices.length > 0);
  }
}