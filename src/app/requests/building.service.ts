/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { AbstractRequestService } from './abstract-request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuildingService extends AbstractRequestService{

  public getBuildings(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/buildings/`);
  }

  /* for now unknown ?
  public getBuildingsByUserId(is: string): Observable<any> {
    
  }
  */

  public getBuilding(buildingId:any): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/buildings/${buildingId}/get`);
  }

  public putBuilding(building: any): Observable<any>
  {
    return this.http.put(`${this.apiUrl}/api/buildings/${building.id}/update`, building);
  }

  public postBuilding(building: any): Observable<any>
  {
    return this.http.post(`${this.apiUrl}/api/buildings/create`, building);
  }

  public deleteBuilding(building: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/buildings/${building.id}/delete`);
  }
}
