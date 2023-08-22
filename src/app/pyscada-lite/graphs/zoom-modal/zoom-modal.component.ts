import { Component, OnInit, AfterViewInit } from "@angular/core";
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ChartType } from "src/app/models/chart-type";

@Component({
    selector: 'app-zoom-modal',
    templateUrl: './zoom-modal.component.html',
    styleUrls: ['./zoom-modal.component.scss']
  })
  export class ZoomModalComponent implements OnInit  {
    
    public idGraph!: string;
    public chartType: string = 'number';
    public chartTypes = new ChartType();
    public chart!: any;
    public chartHeight = "80vh";
    public chartWidth = "100vw";

    constructor(
      public dialogRef: DynamicDialogRef,
      public config: DynamicDialogConfig,
    ) {
      this.chart = this.config.data.chart;
    }

    public ngOnInit(): void {
      this.idGraph = `modal_${Math.floor(Math.random() * 10000 + 1)}`;
      this.chartType = this.chartTypes.getNameByValue(this.chart.chartType);      
    }
  }