import { Component, inject } from '@angular/core';
import { FloatLabelModule } from "primeng/floatlabel"
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from "primeng/button";
import { ToastService } from '../../../../services/toast-service';
import { DividerModule } from 'primeng/divider';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../../../services/auth-service';
import { LoginRequest } from '../../../../models/login-request';

@Component({
  selector: 'app-login',
  imports: [CardModule, InputTextModule, PasswordModule, FloatLabelModule, ButtonModule, DividerModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  username = '';
  password = '';

  private authService: AuthService;
  private toastService: ToastService = inject(ToastService);

  constructor(private auth: AuthService) {
    this.authService = this.auth;
  }

  onLoginButtonClicked() {
    this.toastService.showErrorToast('Title', 'message');
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form values:', form.value);
      // np. this.authService.login(this.username, this.password);

      const loginRequest: LoginRequest = {
        username: this.username,
        password: this.password
      };

      this.authService.login(loginRequest).subscribe({
        next: (res) => {
          console.log('Logged', res);
        },
        error: (err) => {
          console.error('Error', err);
        },
        complete: () => {
          console.log('Finished');
        }
      });
    }
  }
}
