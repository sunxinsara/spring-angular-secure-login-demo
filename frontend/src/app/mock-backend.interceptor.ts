import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap } from 'rxjs/operators';

@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Simulate backend API delay
    return of(null).pipe(
      delay(500),
      mergeMap(() => {
        // Mock login endpoint
        if (req.url.endsWith('/api/auth/login') && req.method === 'POST') {
          const { username, password } = req.body;
          if (username === 'test' && password === 'test123') {
            // Simulate JWT token
            localStorage.setItem('mock-token', 'mock-jwt-token');
            return of(new HttpResponse({
              status: 200,
              body: {
                token: 'mock-jwt-token',
                username: 'test',
                roles: ['USER']
              }
            }));
          } else {
            return throwError(() => new HttpErrorResponse({
              status: 401,
              statusText: 'Unauthorized',
              error: { message: 'Invalid credentials' }
            }));
          }
        }

        // Mock /api/me endpoint for session
        if (req.url.endsWith('/api/me') && req.method === 'GET') {
          const token = localStorage.getItem('mock-token');
          if (token === 'mock-jwt-token') {
            return of(new HttpResponse({
              status: 200,
              body: {
                authenticated: true,
                name: 'Test User',
                email: 'test@example.com',
                picture: ''
              }
            }));
          } else {
            return of(new HttpResponse({
              status: 200,
              body: { authenticated: false }
            }));
          }
        }

        // Mock /logout endpoint
        if (req.url.endsWith('/logout') && req.method === 'POST') {
          localStorage.removeItem('mock-token');
          return of(new HttpResponse({ status: 200, body: {} }));
        }

        // Pass through other requests
        return next.handle(req);
      })
    );
  }
}
