import { Injectable } from '@angular/core';
import { AbstractRequestService } from 'src/app/requests/abstract-request.service';
import { Observable } from 'rxjs';
import { JWTResponse } from 'src/app/authentication/interfaces/JWTResponse';
import Credential from 'src/app/authentication/models/Credential';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends AbstractRequestService {

  public login(credential: Credential): Observable<JWTResponse> {
    return this.http.post<JWTResponse>(`${this.apiUrl}/login/`, credential);
  }

  public logout(): void {
    this.tokenService.removeTokens();
    this.toastService.sendInfo("Vous êtes maintenant déconnecté")
    void this.router.navigate(['/auth', 'login']);
  }
}
