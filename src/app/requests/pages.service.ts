/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { AbstractRequestService } from './abstract-request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagesService extends AbstractRequestService{

  public getPages(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/pages`);
  }
}
