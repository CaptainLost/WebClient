import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';

describe('authGuard', () => {
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated', 'checkAuthStatus']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should allow access when user is authenticated', (done) => {
    authService.isAuthenticated.and.returnValue(true);

    TestBed.runInInjectionContext(() => {
      const result = authGuard({} as any, {} as any);
      
      expect(result).toBe(true);
      expect(router.navigate).not.toHaveBeenCalled();
      done();
    });
  });

  it('should redirect to login when user is not authenticated', (done) => {
    authService.isAuthenticated.and.returnValue(false);

    TestBed.runInInjectionContext(() => {
      const result = authGuard({} as any, {} as any);
      
      expect(result).toBe(false);
      expect(router.navigate).toHaveBeenCalledWith(['/auth/login']);
      done();
    });
  });

  it('should check auth status when not yet known', (done) => {
    authService.isAuthenticated.and.returnValue(null);
    authService.checkAuthStatus.and.returnValue(of(true));

    TestBed.runInInjectionContext(() => {
      const result = authGuard({} as any, {} as any);
      
      if (typeof result === 'object' && 'subscribe' in result) {
        (result as any).subscribe((canActivate: boolean) => {
          expect(canActivate).toBe(true);
          expect(authService.checkAuthStatus).toHaveBeenCalled();
          expect(router.navigate).not.toHaveBeenCalled();
          done();
        });
      }
    });
  });
});
