/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { AbstractRequestService } from './abstract-request.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChartService extends AbstractRequestService{

  public getChartById(chartId:any): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/datas?chart_id=${chartId}`);
  }

  public getChartsIsVisibleByPageId(is_visible:any, page_id: any): Observable<any> {
    const params = new HttpParams().set('is_visible', is_visible).set('page_id', page_id);
    return this.http.get(`${this.apiUrl}/api/charts`, {params});
  }

  public getVariablesValuesByRangeDatesAndChartId(chart_id: any, date_start: any, date_end: any, aggregate_type: any): Observable<any> {
    const params = new HttpParams().set('chart_id', chart_id).set('date_start', date_start).set('date_end', date_end).set('aggregate_type', aggregate_type);
    return this.http.get(`${this.apiUrl}/api/chart_date_range`, {params});
  }
}
