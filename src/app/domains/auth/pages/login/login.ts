import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FloatLabelModule } from "primeng/floatlabel"
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from "primeng/button";
import { CheckboxModule } from 'primeng/checkbox';
import { ToastService } from '../../../../shared/utils/toast';
import { DividerModule } from 'primeng/divider';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/login-request';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiError } from '../../../../shared/models/api-error';

@Component({
  selector: 'app-login',
  imports: [CardModule, InputTextModule, PasswordModule, FloatLabelModule, IconFieldModule, InputIconModule, ButtonModule, CheckboxModule, DividerModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly toastService = inject(ToastService);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);

  protected readonly loginForm = this.formBuilder.nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    isPersistent: [false]
  });

  protected onSubmit(): void {
    if (this.loginForm.valid) {
      const loginRequest: LoginRequest = this.loginForm.getRawValue();

      this.authService.login(loginRequest).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (errorResponse: HttpErrorResponse) => {
          if (errorResponse.status === 401) {
            const apiError = errorResponse.error as ApiError;

            this.toastService.showErrorToast(apiError?.message);
          }
        }
      });
    }
  }
}
