/* eslint-disable @typescript-eslint/no-unused-vars */ /* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TokenStorageService } from 'src/app/authentication/services/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly tokenStorage: TokenStorageService,
  ) {
  }

  public canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): boolean {
    if (this.tokenStorage.isExpired()) {
      void this.router.navigate(['/auth', 'login']);
      return false;
    }
    return true;
  }
}
