import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastService } from '../services/toast.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastService: ToastService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let message = 'Something went wrong. Please try again.';

        if (error.status === 0) {
          message = 'Could not reach the server. Is the API running?';
        } else if (error.status === 404) {
          message = 'The requested item was not found.';
        } else if (error.status === 400) {
          message = 'Invalid request. Please check your input.';
        } else if (error.status >= 500) {
          message = 'Server error. Please try again shortly.';
        }

        this.toastService.show(message, 'error');
        return throwError(() => error);
      })
    );
  }
}