import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { loginGuard } from './login.guard';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';

describe('loginGuard', () => {
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

  it('should redirect to home when user is already authenticated', (done) => {
    authService.isAuthenticated.and.returnValue(true);

    TestBed.runInInjectionContext(() => {
      const result = loginGuard({} as any, {} as any);
      
      expect(result).toBe(false);
      expect(router.navigate).toHaveBeenCalledWith(['/']);
      done();
    });
  });

  it('should allow access to login when user is not authenticated', (done) => {
    authService.isAuthenticated.and.returnValue(false);

    TestBed.runInInjectionContext(() => {
      const result = loginGuard({} as any, {} as any);
      
      expect(result).toBe(true);
      expect(router.navigate).not.toHaveBeenCalled();
      done();
    });
  });

  it('should check auth status and redirect when authenticated', (done) => {
    authService.isAuthenticated.and.returnValue(null);
    authService.checkAuthStatus.and.returnValue(of(true));

    TestBed.runInInjectionContext(() => {
      const result = loginGuard({} as any, {} as any);
      
      if (typeof result === 'object' && 'subscribe' in result) {
        (result as any).subscribe((canActivate: boolean) => {
          expect(canActivate).toBe(false);
          expect(authService.checkAuthStatus).toHaveBeenCalled();
          expect(router.navigate).toHaveBeenCalledWith(['/']);
          done();
        });
      }
    });
  });
});
