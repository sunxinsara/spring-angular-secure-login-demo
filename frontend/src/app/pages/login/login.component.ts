import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss', // Angular 17+ supports singular styleUrl
})
export class LoginComponent {
  // 🔹 Signals replace primitive properties
  isRedirecting = signal(false);
  errorMsg = signal<string | null>(null);
  username = signal('');
  password = signal('');

  private auth = inject(AuthService);
  private router = inject(Router);

  login(): void {
    this.errorMsg.set(null);
    this.isRedirecting.set(true);

    this.auth.login(this.username(), this.password()).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.errorMsg.set(err?.error?.message || 'Login failed');
        this.isRedirecting.set(false);
      },
    });
  }

  loginWithGoogle(): void {
    this.isRedirecting.set(true);
    this.auth.loginWithGoogle(); // redirect to /oauth2/authorization/google
  }
}
