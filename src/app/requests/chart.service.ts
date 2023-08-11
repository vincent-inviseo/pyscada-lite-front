/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { AbstractRequestService } from './abstract-request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartService extends AbstractRequestService{

  public getChartById(chartId:any): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/datas?chart_id=${chartId}`);
  }
}
