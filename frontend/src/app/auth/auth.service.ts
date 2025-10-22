
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}


  /** Mock login with username/password (for dev/testing). */
  login(username: string, password: string): Observable<any> {
    return this.http.post('/api/auth/login', { username, password });
  }

  /** Redirect to Spring Security's OAuth2 entrypoint (proxied by Angular dev server). */
  loginWithGoogle(): void {
    const redirect = encodeURIComponent('/home');
    window.location.href = `/oauth2/authorization/google?redirect=${redirect}`;
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
