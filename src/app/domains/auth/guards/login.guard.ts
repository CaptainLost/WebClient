import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';
import { APP_ROUTES } from '../../../shared/config/routes.config';

export const loginGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const authStatus = authService.isAuthenticated();
  
  if (authStatus !== null) {
    if (authStatus) {
      router.navigate([APP_ROUTES.home]);

      return false;
    }
    return true;
  }

  return authService.checkAuthStatus().pipe(
    map(isAuthenticated => {
      if (isAuthenticated) {
        router.navigate([APP_ROUTES.home]);
        
        return false;
      }
      return true;
    })
  );
};
