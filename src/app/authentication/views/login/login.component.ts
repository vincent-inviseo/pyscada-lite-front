import { Component, OnInit } from '@angular/core';
import Credential from 'src/app/authentication/models/Credential';
import { AuthService } from 'src/app/requests/auth.service';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/authentication/services/token-storage.service';
import { opacityAnimation } from 'src/app/design/animations/opacity';
import { ToastService } from 'src/app/design/services/toast.service';
import { UntilDestroy } from '@ngneat/until-destroy';
import { StorageService } from '../../services/storage.service';

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [opacityAnimation],
})
export class LoginComponent implements OnInit {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  public credential = new Credential();

  public loading = false;

  public locale = 'fr';

  constructor(
    private readonly router: Router,
    private readonly tokenStorage: TokenStorageService,
    private readonly storage: StorageService,
    private readonly requests: AuthService,
    private readonly toastService: ToastService
  ) {
  }

  public ngOnInit(): void {
    if (this.storage.get('token')) {
      this.router.navigate(['/buildings']);
    }
  }

  public submit(): void {
    this.loading = true;
    this.requests.login(this.credential)
      .subscribe({
        next: (token) => {
          this.tokenStorage.setTokens(token);
        },
        error: (e) => {
          if (e.status === 401) {
            this.toastService.sendError("Email ou mot de passe invalide");
            this.loading = false;
          }
        },
        
        complete: () => {
          this.loading = false;
          location.reload();
      }
    });
  }



}
