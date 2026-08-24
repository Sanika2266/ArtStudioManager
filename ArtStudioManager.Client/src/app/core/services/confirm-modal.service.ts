import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

interface ModalState {
  title: string;
  message: string;
  confirmLabel?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfirmModalService {
  private stateSubject = new BehaviorSubject<ModalState | null>(null);
  state$ = this.stateSubject.asObservable();

  private resultSubject = new BehaviorSubject<boolean | null>(null);

  confirmDelete(itemName: string): Observable<boolean> {
    this.stateSubject.next({
      title: 'Confirm Deletion',
      message: `Are you sure you want to delete "${itemName}"? This cannot be undone.`,
      confirmLabel: 'Delete'
    });

    // Return an Observable that emits exactly once, when the user picks an option
    return this.resultSubject.pipe(
      filter((val): val is boolean => val !== null), // ignore the initial null value
      take(1) // auto-complete after the first real answer
    );
  }

  confirm(): void {
    this.stateSubject.next(null); // close the modal
    this.resultSubject.next(true);
    this.resultSubject.next(null); // reset for next use
  }

  cancel(): void {
    this.stateSubject.next(null);
    this.resultSubject.next(false);
    this.resultSubject.next(null);
  }
}