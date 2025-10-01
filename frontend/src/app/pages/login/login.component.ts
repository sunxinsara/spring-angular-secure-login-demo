import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isRedirecting = false;

  constructor(private auth: AuthService) {}

  loginWithGoogle(): void {
    this.isRedirecting = true;
    this.auth.loginWithGoogle(); // redirects to /oauth2/authorization/google
  }
}
