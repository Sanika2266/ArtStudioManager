import { Component, OnInit } from '@angular/core';
import { Inquiry, InquiryStatus } from '../../../shared/models/inquiry.model';
import { InquiryService } from '../../../core/services/inquiry.service';
import { ConfirmModalService } from '../../../core/services/confirm-modal.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-inquiry-list',
  templateUrl: './inquiry-list.component.html',
  styleUrls: ['./inquiry-list.component.css']
})
export class InquiryListComponent implements OnInit {
  inquiries: Inquiry[] = [];
  loading = true;
  error: string | null = null;
  updatingId: number | null = null;
  deletingId: number | null = null;

  InquiryStatus = InquiryStatus;
  apiBaseUrl = environment.apiUrl;

  constructor(
    private inquiryService: InquiryService,
    private confirmModal: ConfirmModalService
  ) { }

  ngOnInit(): void {
    this.loadInquiries();
  }

  loadInquiries(): void {
    this.loading = true;
    this.inquiryService.getAll().subscribe({
      next: (data) => {
        this.inquiries = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load inquiries', err);
        this.error = 'Could not load inquiries. Is the API running?';
        this.loading = false;
      }
    });
  }

  changeStatus(inquiry: Inquiry, status: InquiryStatus): void {
    this.updatingId = inquiry.id;
    this.inquiryService.updateStatus(inquiry.id, status).subscribe({
      next: () => {
        inquiry.status = status;
        this.updatingId = null;
      },
      error: (err) => {
        console.error('Failed to update status', err);
        this.updatingId = null;
      }
    });
  }

  deleteInquiry(inquiry: Inquiry): void {
    this.confirmModal.confirmDelete(`inquiry from ${inquiry.name}`).subscribe(confirmed => {
      if (!confirmed) return;

      this.deletingId = inquiry.id;
      this.inquiryService.delete(inquiry.id).subscribe({
        next: () => {
          this.deletingId = null;
          this.loadInquiries();
        },
        error: (err) => {
          console.error('Failed to delete inquiry', err);
          this.deletingId = null;
        }
      });
    });
  }

  getStatusLabel(status: InquiryStatus): string {
    return ['New', 'In Progress', 'Completed'][status];
  }
}