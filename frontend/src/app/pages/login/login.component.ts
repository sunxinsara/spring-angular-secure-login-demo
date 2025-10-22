

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isRedirecting = false;
  errorMsg = '';
  username = '';
  password = '';
  auth = inject(AuthService);
  router = inject(Router);

  login(): void {
    this.errorMsg = '';
    this.isRedirecting = true;
    this.auth.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.errorMsg = err?.error?.message || 'Login failed';
        this.isRedirecting = false;
      }
    });
  }

  loginWithGoogle(): void {
    this.isRedirecting = true;
    this.auth.loginWithGoogle(); // redirects to /oauth2/authorization/google
  }
}
