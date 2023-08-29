/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ChartService } from 'src/app/requests/chart.service';
import { ChartType } from 'src/app/models/chart-type';
import { DateCleanerGraphService } from 'src/app/services/date-cleaner-graph.service';
import { chartWidth } from 'src/app/models/chart-width';

@UntilDestroy()
@Component({
  selector: 'app-building-detail',
  templateUrl: './building-detail.component.html',
  styleUrls: ['./building-detail.component.scss']
})
export class BuildingDetailComponent implements OnInit {

  public chartTypes = new ChartType();

  public chartWidths = new chartWidth();
 
  public charts: any[] = [];

  public rangeDates: any[] = [];

  constructor(
    private readonly chartService: ChartService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly dateCleanerGraphService: DateCleanerGraphService
  )
  {}

  public ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.charts = [];
      // case if at least one page
      if (params.has('page_id')) {
        this.chartService.getChartsIsVisibleByPageId('True', params.get('page_id')).subscribe((charts_ids) => {
          if (charts_ids.charts_ids.length > 0) {
            for (const chart_id of charts_ids.charts_ids) {
              this.chartService.getChartById(chart_id).subscribe((chart_datas) => {
                const currentDatetime = new Date();
                const datetime24HoursBefore = new Date();
                datetime24HoursBefore.setDate(datetime24HoursBefore.getDate() - 1);
                this.rangeDates.push(datetime24HoursBefore);
                this.rangeDates.push(currentDatetime);

                const date_start = this.dateCleanerGraphService.cleanDateForFilterBackend(this.rangeDates[0]).toString();
                const date_end = this.dateCleanerGraphService.cleanDateForFilterBackend(this.rangeDates[1]).toString();
                this.chartService.getVariablesValuesByRangeDatesAndChartId(chart_id, date_start, date_end, 0).subscribe((variablesValues) => {
                  chart_datas.datas.variables = variablesValues;
                  chart_datas.chart.width = this.chartWidths.getWidthInVh(chart_datas.chart.width);
                  this.charts.push(chart_datas);
                })
              })
            }
          }
        })
      }
      // ToDO message if page but no charts associated with it ?
      // ToDo handle case no page for a building
    })
  }
}
