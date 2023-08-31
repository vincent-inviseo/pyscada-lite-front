/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { AbstractRequestService } from './abstract-request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VariableService extends AbstractRequestService{

    public postVariableAndUnit(json_data: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/api/variables/create`, json_data);
    }
}
