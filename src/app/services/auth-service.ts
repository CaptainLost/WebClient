import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient: HttpClient = inject(HttpClient);

  // move
  private apiUrl = 'http://localhost:5271';

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/login`, request);
  }
}
