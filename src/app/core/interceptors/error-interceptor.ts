import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../shared/utils/toast';
import { catchError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastr = inject(ToastService);

  return next(req).pipe(
    catchError(error => {
      // Handle global errors here if needed
      throw error;
    })
  );
};
