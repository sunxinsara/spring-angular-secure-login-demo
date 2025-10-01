import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  /** Redirect to Spring Security's OAuth2 entrypoint (proxied by Angular dev server). */
  loginWithGoogle(): void {
    window.location.href = '/oauth2/authorization/google';
  }

  /** Optional: fetch current user from backend (/api/me). */
  me() {
    return this.http.get<{ authenticated: boolean; name?: string; email?: string; picture?: string }>('/api/me');
  }

  /** Optional: trigger Spring Security logout. */
  logout() {
    return this.http.post('/logout', {});
  }
}
