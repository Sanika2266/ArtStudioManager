import { Component } from '@angular/core';
import { ToastService, Toast } from '../../core/services/toast.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {
  toast$: Observable<Toast | null>;

  constructor(private toastService: ToastService) {
    this.toast$ = this.toastService.toast$;
  }
}