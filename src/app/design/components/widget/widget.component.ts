/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Component, Input, AfterViewInit, OnInit } from '@angular/core';
import { ChartType } from 'src/app/models/chart-type';
import { ZoomModalComponent } from 'src/app/pyscada-lite/graphs/zoom-modal/zoom-modal.component';
import { DialogService } from 'primeng/dynamicdialog';
import { AggregateTypes } from 'src/app/models/aggregate-type';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements AfterViewInit, OnInit {

  public chartTypes = new ChartType();

  @Input() public title = "";

  @Input() public idGraph!: string

  @Input() public chart!: any

  @Input() public chartHeight = "";

  @Input() public colorLoneValue = "var(--main-blue)";

  @Input() public loneValue!: string;

  @Input() public unitLoneValue!: string;

  @Input() public datePattern!: string;

  @Input() public widgetDateInputId!: string;

  public chartType = 'number';

  public rangeDates: any[] = [];

  public idDropdownContent!: string;

  public resetZoom = false;

  public generateCsv = false;

  public aggregateType: number = 0;

  public aggregateTypes!: any[];

  public idAggregateLabel!: string;

  constructor(
    private readonly primeNgDialogService: DialogService
  ) {}

  public ngAfterViewInit(): void {
    this.widgetDateInputId = this.widgetDateInputId + `_${Math.floor(Math.random() * 10000 + 1)}`;
  }

  public ngOnInit(): void {
    const aggTypes = new AggregateTypes();
    this.aggregateTypes = aggTypes.aggregateTypes;
    const currentDatetime = new Date();
    const datetime24HoursBefore = new Date();
    datetime24HoursBefore.setDate(datetime24HoursBefore.getDate() - 1);
    this.rangeDates.push(datetime24HoursBefore);
    this.rangeDates.push(currentDatetime);

    this.chartType = this.chartTypes.getNameByValue(this.chart.chart.chartType);  
    this.idGraph = this.idGraph + `_${Math.floor(Math.random() * 10000 + 1)}`;
    this.idAggregateLabel = "aggregateLabel" + `_${Math.floor(Math.random() * 10000 + 1)}`;
  }

  public zoomGrapModal(chart:any): void {
    const dialog = this.primeNgDialogService.open(ZoomModalComponent, {
      data: chart
    });

  }

  public askResetZoomChart(): void {
    this.resetZoom = !this.resetZoom;
  }

  public askExportDatas(): void {
    // In component of the chart, open modal with primeNgDialogueService
    this.generateCsv = !this.generateCsv; 
  }

  public importData(): void {

  }

  public prevent($event:any): void {
    $event.preventDefault();
    $event.stopPropagation();
  }
}
