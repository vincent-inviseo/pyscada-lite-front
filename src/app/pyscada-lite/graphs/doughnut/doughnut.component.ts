/* eslint-disable @typescript-eslint/no-explicit-any */

import { Component, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ExportDataAsCsvService } from 'src/app/services/export-as-csv';
import { ChartService } from 'src/app/requests/chart.service';
import { DateCleanerGraphService } from 'src/app/services/date-cleaner-graph.service';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styleUrls: ['./doughnut.component.scss']
})

export class DoughnutComponent implements AfterViewInit, OnChanges {

  constructor(
    private readonly dateCleanerGraphService: DateCleanerGraphService,
    private readonly chartService: ChartService,
    private readonly exportAsCsvService: ExportDataAsCsvService 
  ) {}

  @Input() public id!: string;

  @Input() public chart!: any;

  @Input() public chartWidth = "";

  @Input() public chartHeight = "";

  @Input() public rangeDates!: any[];

  @Input() public generateCsv = false;

  @Input() public aggregateType!: number;

  public labelsValues = ["Italy", "France", "Spain", "USA", "Argentina", "test"];
  public values = [55, 49, 44, 24, 15, 30];
  public colors = ["#4C0BC6", "#02C794", "#FAC528", "#27BEF2", "#EA4C87", "#000000"];

  public sumValues = 0;

  public doughnut!: Chart<"doughnut", number[], string>;

  public ngAfterViewInit(): void {
    this.values.forEach(value => { this.sumValues = this.sumValues + value });
    this.setDoughnut();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['generateCsv'] != undefined) {
      if (changes['generateCsv'].previousValue != undefined) {
        this.askExportDatas();
      }
    }
    if (changes['rangeDates'] != undefined) {
      if (changes['rangeDates'].previousValue != undefined) {
        const date_start = this.dateCleanerGraphService.cleanDateForFilterBackend(this.rangeDates[0]);
        let date_end!: string;
        if (this.rangeDates[1] == null) {
          const currentDatetime = new Date();
          date_end = this.dateCleanerGraphService.cleanDateForFilterBackend(currentDatetime).toString();
        }
        else {
          date_end = this.dateCleanerGraphService.cleanDateForFilterBackend(this.rangeDates[1]).toString();
        }
        this.chartService.getVariablesValuesByRangeDatesAndChartId(this.chart.chart.id, date_start, date_end, this.aggregateType).subscribe((variablesValues) => {
          this.chart.datas.variables = variablesValues;
          // this.updateDoughnut(this.chart);
        });
      }
    }
    else if (changes['aggregateType'] != undefined) {
      if (changes['aggregateType'].previousValue != undefined) {
        const date_start = this.dateCleanerGraphService.cleanDateForFilterBackend(this.rangeDates[0]);
        let date_end!: string;
        if (this.rangeDates[1] == null) {
          const currentDatetime = new Date();
          date_end = this.dateCleanerGraphService.cleanDateForFilterBackend(currentDatetime).toString();
        }
        else {
          date_end = this.dateCleanerGraphService.cleanDateForFilterBackend(this.rangeDates[1]).toString();
        }
        this.chartService.getVariablesValuesByRangeDatesAndChartId(this.chart.chart.id, date_start, date_end, this.aggregateType).subscribe((variablesValues) => {
          this.chart.datas.variables = variablesValues;
          // this.updateDoughnut(this.chart);
        });
      }
    }
  }

  public setValuesDataset(chart: any) {
    
  }

  public updateDoughnut(chart: any) {

  }

  centerText = {
    id: 'centerText',
    afterDatasetsDraw: (chart: any) => {
      const { ctx, chartArea: {top, left, width, height} } = chart;
      if (chart._active.length > 0) {
        const value = chart.config.data.datasets[chart._active[0].datasetIndex].data[chart._active[0].index];
        ctx.save();
        
        const x = chart.getDatasetMeta(0).data[0].x;
        
        const sizeText = (x + (left + x / 2)) / 7;

        ctx.font = "" + sizeText + "px Baloo2";
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText((100 * value / this.sumValues).toFixed(2) + ' %', left + width / 2, top + height / 2);
        chart.update();
      }
    }
  };

  public setDoughnut() {
    Chart.defaults.font.family = "Baloo 2";
    this.doughnut = new Chart(this.id, {
      type: 'doughnut',
      data: {
          labels: this.labelsValues,
          datasets: [
            {
              data: this.values,
              backgroundColor: this.colors
            }
        ]
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
            titleFont: {
              family: "Baloo2"
            },
            bodyFont: {
              family: "Baloo2"
            },
            footerFont: {
              family: "Baloo2"
            }
          },
        },
      },
      plugins: [this.centerText]
    })
  }

  public askExportDatas(): void {
    const values = [...this.chart.datas.variables.map( (v:any) => v.values)];
    this.exportAsCsvService.exportToCsv(values[0], 'exportedData.csv');
  }
}
