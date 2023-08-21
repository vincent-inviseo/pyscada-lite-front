/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ChartService } from 'src/app/requests/chart.service';
import { PageService } from 'src/app/requests/page.service';
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
    private readonly pageService: PageService,
    private readonly activatedRoute: ActivatedRoute
  )
  {}

  public ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.pageService.getPagesByBuildingId(params.get('id')).subscribe((pages) => {
        if (pages) {
          for(let page of pages.pages) {
            this.chartService.getChartsIsVisibleByPageId('True', page.id).subscribe((charts_ids) => {
              for(let chart_id of charts_ids.charts_ids) {
                if (chart_id) {
                  this.chartService.getChartById(chart_id).subscribe((chart_datas) => {
                    // let test =  this.chartTypes.getNameByValue(chart_datas.chart.chartType);
                    this.charts.push(chart_datas);
                 })
                }
              }
            })
          }
        }
      })
    })
    console.log("charts", this.charts);
  }
}
