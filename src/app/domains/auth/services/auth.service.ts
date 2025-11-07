import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of, map, BehaviorSubject } from 'rxjs';
import { environment } from '../../../shared/config/environment';
import { LoginRequest } from '../models/login-request';
import { RegisterRequest } from '../models/register-request';
import { SessionResponse } from '../models/session-response';
import { API_ENDPOINTS } from '../../../shared/config/api-endpoints.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;
  private readonly isAuthenticatedSubject = new BehaviorSubject<boolean | null>(null);
  private readonly sessionSubject = new BehaviorSubject<SessionResponse | null>(null);
  
  public readonly isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  public readonly session$ = this.sessionSubject.asObservable();

  login(request: LoginRequest): Observable<void> {
    return this.httpClient.post<void>(`${this.apiUrl}${API_ENDPOINTS.auth.login}`, request).pipe(
      tap(() => {
        this.isAuthenticatedSubject.next(true);
        this.checkAuthStatus().subscribe();
      })
    );
  }

  logout(): Observable<void> {
    return this.httpClient.post<void>(`${this.apiUrl}${API_ENDPOINTS.auth.logout}`, {}).pipe(
      tap(() => {
        this.isAuthenticatedSubject.next(false);
        this.sessionSubject.next(null);
      })
    );
  }

  checkAuthStatus(): Observable<boolean> {
    return this.httpClient.get<SessionResponse>(`${this.apiUrl}${API_ENDPOINTS.auth.session}`).pipe(
      map((response) => {
        this.isAuthenticatedSubject.next(response.isAuthenticated);
        this.sessionSubject.next(response);

        return response.isAuthenticated;
      }),
      catchError(() => {
        this.isAuthenticatedSubject.next(false);
        this.sessionSubject.next(null);
        
        return of(false);
      })
    );
  }

  register(request: RegisterRequest): Observable<void> {
    return this.httpClient.post<void>(`${this.apiUrl}${API_ENDPOINTS.auth.register}`, request).pipe(
      tap(() => this.isAuthenticatedSubject.next(true))
    );
  }
  
  isAuthenticated(): boolean | null {
    return this.isAuthenticatedSubject.value;
  }
}
