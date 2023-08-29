import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from '../services/cookie.service';

@Injectable()
export class CSRFInterceptor implements HttpInterceptor {
  constructor(
    private readonly cookieService: CookieService,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Récupérer le token CSRF depuis les cookies (ajustez le nom du cookie selon votre application)
    const csrfToken = this.cookieService.getCookie('csrftoken');

    // Cloner la requête et ajouter le token CSRF à l'en-tête si disponible
    if (csrfToken) {
      const clonedRequest = request.clone({
        setHeaders: {
          'X-CSRF-Token': csrfToken,
        },
      });
      return next.handle(clonedRequest);
    }

    return next.handle(request);
  }
}