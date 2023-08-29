import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/authentication/services/token-storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private readonly tokenStorage: TokenStorageService,
  ) {}

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.tokenStorage.getTokenAccess()) {
      const req = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.tokenStorage.getTokenAccess()}`,
        },
      });

      return next.handle(req);
    }

    return next.handle(request);
  }
}
