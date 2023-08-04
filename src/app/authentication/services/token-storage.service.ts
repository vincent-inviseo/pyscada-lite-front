import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from 'src/app/authentication/services/storage.service';
import CredentialToken from 'src/app/authentication/models/CredentialToken';
import Token from 'src/app/authentication/models/Token'
import { JWTResponse } from 'src/app/authentication/interfaces/JWTResponse';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  protected credential!: CredentialToken | null;

  protected helper: JwtHelperService;

  protected username!: string;

  protected credentialResponse!: JWTResponse;

  constructor(protected storage: StorageService, private router: Router) {
    this.helper = new JwtHelperService();

    if (this.storage.has('token')) {
      this.credential = new CredentialToken();
      this.credential.tokens.access = this.storage.get('token');
      
      this.decodeToken();
    }
  }

  public setTokens(credential: JWTResponse): void {
    this.storage.set('token', credential.tokens.access);
    this.decodeToken();
  }

  public getTokenAccess(): null | string {
    if (!this.credential || !this.credential.tokens) {
      return null;
    }

    return this.credential.tokens.access;
  }

  public getTokenCredential(): CredentialToken {
    return this.credential ?? new CredentialToken();
  }

  public isExpired(): boolean {
    if (!this.credential || !this.credential.tokens) {
      return true;
    }

    return this.helper.isTokenExpired(this.credential.tokens.access);
  }

  public removeTokens(): void {
    this.credential = null;
    this.storage.remove('token');
  }

  public getUsername(): string {
    return this.username;
  }

  protected decodeToken(): void {
    if (!this.credential || !this.credential.tokens) {
      return;
    }
    
    const decode = this.helper.decodeToken(this.credential.tokens.access);
    
    this.username = decode.username;
  }
}
