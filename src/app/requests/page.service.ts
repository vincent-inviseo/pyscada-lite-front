/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { AbstractRequestService } from './abstract-request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService extends AbstractRequestService{

  public getPages(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/pages/`);
  }

  public getPagesByBuildingId(building_id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/pages?building_id=${building_id}`)
  }

  public getPageById(page_id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/pages/${page_id}/get`)
  }
}
