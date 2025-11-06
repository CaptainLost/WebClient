import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../shared/config/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  login(request: LoginRequest): Observable<void> {
    return this.httpClient.post<void>(`${this.apiUrl}/api/auth/login`, request);
  }
}
