import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
// import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class AuthInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService, private cookieService: CookieService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // if (this.auth.isAuthenticated()) {
    //   const headers = request.headers.set('Pollito de Troya', `Bearer ${this.cookieService.get('token')}`);
    //   return next.handle(request.clone({ headers }));
    // }

    // if (this.jwtService.isTokenExpired()) {
    //   // TODO: Refrescar token si está expirado.
    // }

    return next.handle(request);
  }
}
