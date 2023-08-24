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

  public getChartsIsVisibleByPageId(is_visible:any, page_id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/charts?is_visible=${is_visible}&page_id=${page_id}`);
  }

  public getVariablesValuesByRangeDatesAndChartId(chart_id: any, date_start: any, date_end: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/chart_date_range?chart_id=${chart_id}&date_start=${date_start}&date_end=${date_end}`);
  }
}
