/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ChartService } from 'src/app/requests/chart.service';
import { ChartType } from 'src/app/models/chart-type';

// import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';

@UntilDestroy()
@Component({
  selector: 'app-building-detail',
  templateUrl: './building-detail.component.html',
  styleUrls: ['./building-detail.component.scss']
})
export class BuildingDetailComponent implements OnInit {

  public chartTypes = new ChartType();

  public charts: any[] = [];



  constructor(
    private readonly chartService: ChartService,
    private readonly activatedRoute: ActivatedRoute
  )
  {}

  public ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.charts = [];
      // case if at least one page
      if (params.get('page_id') != null) {
        this.chartService.getChartsIsVisibleByPageId('True', params.get('page_id')).subscribe((charts_ids) => {
          if (charts_ids.charts_ids.length > 0) {
            for (const chart_id of charts_ids.charts_ids) {
              this.chartService.getChartById(chart_id).subscribe((chart_datas) => {
                // let test =  this.chartTypes.getNameByValue(chart_datas.chart.chartType);
                this.charts.push(chart_datas);
              })
            }
          }
        })
      }
      // ToDO message if page but no charts associated with it ?
      // ToDo handle case no page for a building
    })
    console.log("charts", this.charts);
  }
}
