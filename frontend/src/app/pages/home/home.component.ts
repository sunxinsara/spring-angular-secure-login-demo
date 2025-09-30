import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: { name?: string; email?: string; picture?: string } | null = null;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.auth.me().subscribe({
      next: (u: any) => this.user = u,
      error: () => this.user = null
    });
  }

  logout(): void {
    this.auth.logout().subscribe(() => {
      this.user = null;
      window.location.href = '/'; // redirect to login
    });
  }
}
