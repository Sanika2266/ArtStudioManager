import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
  message: string;
  type: 'error' | 'success';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new BehaviorSubject<Toast | null>(null);
  toast$ = this.toastSubject.asObservable();

  show(message: string, type: 'error' | 'success' = 'error'): void {
    this.toastSubject.next({ message, type });
    // Auto-dismiss after 4 seconds
    setTimeout(() => this.toastSubject.next(null), 4000);
  }
}