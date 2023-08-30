/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { AbstractRequestService } from './abstract-request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VariableValueService extends AbstractRequestService{

    public importVariableValues(json_data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/api/variable_values`, json_data);
    }
}
