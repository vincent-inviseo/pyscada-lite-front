/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { TokenStorageService } from 'src/app/authentication/services/token-storage.service';
import { StorageService } from 'src/app/authentication/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class UnauthorizedInterceptorService {
  constructor(
    private readonly storage: StorageService,
    private readonly tokenStorage: TokenStorageService,
    private readonly router: Router) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.tokenStorage.removeTokens();
          void this.router.navigate(['/auth', 'login']);
        }
        return throwError(error);
      }),
    );
  }
}
