import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from '../authentication/services/token-storage.service';
import { Router } from '@angular/router';
import { ToastService } from '../design/services/toast.service';

@Injectable({
  providedIn: 'root',
})
export abstract class AbstractRequestService {
  protected apiUrl = environment.apiUrl;

  protected constructor(
    protected readonly http: HttpClient,
    protected readonly tokenService: TokenStorageService,
    protected readonly router: Router,
    protected readonly toastService: ToastService
  ) { }
}

