/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { Component, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';
import { DateCleanerGraphService } from 'src/app/services/date-cleaner-graph.service';
import { ChartService } from 'src/app/requests/chart.service';
import { ExportDataAsCsvService } from 'src/app/services/export-as-csv';
import { DialogService } from 'primeng/dynamicdialog';
import { ExportDataComponent } from 'src/app/design/modals/export-data/export-data.component';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})

export class LineChartComponent implements AfterViewInit, OnChanges {

  constructor(
    private readonly dateCleanerGraphService: DateCleanerGraphService,
    private readonly chartService: ChartService,
    private readonly exportAsCsvService: ExportDataAsCsvService,
    private readonly primeNgDialogService: DialogService
    ) {}

  @Input() public id!: string;

  @Input() public chart!: any;

  @Input() public chartWidth = "";

  @Input() public chartHeight = "";

  @Input() public rangeDates!: any[];

  @Input() public resetZoom = false;

  @Input() public generateCsv = false;

  @Input() public aggregateType!: number;

  public xAxisLabels: string[] = [];
  public yAxisLabel = "";
  public datasetsLabels: string[] = [];

  public datasetsData: any[] = [];
  public datasetsUnits: any[] = [];

  public valuesSet: number[] = [];

  public yAxisMin!: number;
  public yAxisMax!: number;

  public colorSet1 = "#4C0BC6";
  public colorSet2 = "#27BEF2";

  public isInitialChartWithData = false;
  public isAlreadyUpdated = false;

  public lineChart!: Chart<"line", number[], string>;

  noData = {
    id: 'noData',
    afterDatasetsDraw: (chart: any) => {
      const { ctx, data, chartArea: {top, left, width, height} } = chart;
      ctx.save();
      if (data.datasets.length === 0) {
        ctx.fillStyle = 'rgba(102, 102, 102, 0.5)';
        ctx.fillRect(left, top, width, height)

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';

        const sizeText = (width + (left + width / 2)) / 40;

        ctx.font = "" + sizeText + "px Baloo2";
        ctx.fillStyle = 'black';
        ctx.fillText('Pas de données disponibles pour ces dates', left + width / 2, top + height / 2);
      }
    }
  };

  public ngAfterViewInit(): void {
    for (let i = 0; i < this.chart.datas.variables.length; i++) {
      if (this.chart.datas.variables[i].values.length > 0) {
        this.isInitialChartWithData = true;
      }
    }
    if (this.isInitialChartWithData) {
      this.setAllValuesDatasets(this.chart);
      if (this.chart.datas.variables.length == 1) {
        this.yAxisLabel = this.chart.chart.legende_axe_y;
      }
      Chart.register(zoomPlugin);
      this.setLineChart();
      this.lineChart!.options!.scales!['y']!.min = this.yAxisMin;
      this.lineChart!.options!.scales!['y']!.max = this.yAxisMax;
      this.lineChart.data.labels = this.xAxisLabels;
      this.setDatasetsLineChart();
      this.lineChart.update();
    }
    else {
      if (this.chart.datas.variables.length == 1) {
        this.yAxisLabel = this.chart.chart.legende_axe_y;
      }
      Chart.register(zoomPlugin);
      this.setLineChart();
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['resetZoom'] != undefined) {
      if (changes['resetZoom'].previousValue != undefined) {
        this.resetZoomChart();
      }
    }
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
          this.updateLineChart(this.chart);
        })
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
          this.updateLineChart(this.chart);
        })
      }
    }
  }

  // Takes all values without taking into account aggregation
  // Note: need to handle case of a variable with no value at a given time
  public setAllValuesDatasets(chart: any) {
    this.datasetsData = [];
    this.datasetsUnits = [];
    this.datasetsLabels = [];
    this.xAxisLabels = [];
    let minValuesSet: number;
    let maxValuesSet: number;
    const variables = chart.datas.variables;
    for (let i = 0; i < variables.length; i++) {
      this.valuesSet = [];
      this.datasetsUnits.push(variables[i].unit);
      const variable = variables[i];
      const valuesList = variable.values;
      this.datasetsLabels.push(variable.name);
      for (let j = 0; j < valuesList.length; j++) {
        const cleanRecordedAt = this.dateCleanerGraphService.cleanDateGraph(valuesList[j].recordedAt);
        if (cleanRecordedAt && i == 0) {
          this.xAxisLabels.push(cleanRecordedAt.toString());
        }
        else if (i == 0) {
          this.xAxisLabels.push(valuesList[j].recordedAt);
        }
        this.valuesSet.push(valuesList[j].value);
      }
      if (i == 0) {
        this.yAxisMin = Math.min(...this.valuesSet);
        this.yAxisMax = Math.max(...this.valuesSet);
      }
      else {
        minValuesSet = Math.min(...this.valuesSet);
        maxValuesSet = Math.max(...this.valuesSet);
        if (this.yAxisMin > minValuesSet) {
          this.yAxisMin = minValuesSet;
        }
        if (this.yAxisMax < maxValuesSet) {
          this.yAxisMax = maxValuesSet;
        }
      }
      this.datasetsData.push(this.valuesSet);
    }
  }

  public updateLineChart(chart: any): void {
    this.setAllValuesDatasets(chart);
    this.lineChart!.options!.scales!['y']!.min = this.yAxisMin - 1;
    this.lineChart!.options!.scales!['y']!.max = this.yAxisMax + 1;
    this.lineChart.data.labels = this.xAxisLabels;
    this.setDatasetsLineChart();
    this.lineChart.update();
  }

  public setDatasetsLineChart(): void {
    this.lineChart.data.datasets = [];
    for (let i = 0; i < this.datasetsData.length; i++) {
      const dataset =
      {
        label: this.datasetsLabels[i],
        data: this.datasetsData[i],
        pointRadius: 0,
        tension: 0.35
        // backgroundColor: not defined as of now
        // borderColor: same value as backgroundColor
      };
      this.lineChart.data.datasets.push(dataset);
    }
  }

  public setLineChart(): void {
    Chart.defaults.font.family = "Baloo 2"
    this.lineChart = new Chart(this.id, {
      type: 'line',
      data: {
        labels: [],
        datasets: []
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: this.yAxisLabel,
            },
            min: this.yAxisMin,
            max: this.yAxisMax,
          }
        },
        plugins: {
          zoom: {
            zoom: {
              drag: {
                enabled: true
              },
              mode: 'x'
            }
          },
          legend: {
            display: true,
            labels: {
              font: {
                family: "Baloo2",
                size: 15
              },
              usePointStyle: true,
              pointStyle: 'circle'
            },
          },
          tooltip: {
            callbacks: {
              label: () => (''),
              title: () => (''),
              afterBody: (items) => {
                const datasetIndex = items[0].datasetIndex;
                return (" " + items[0].raw + ' ' + this.datasetsUnits[datasetIndex] + ' ');
              },
            },
            displayColors: false,
            titleAlign: 'center',
          }
        },
        interaction: {
          mode: 'nearest',
          intersect: false
        },
      },
      plugins: [this.noData]
    })
  }

  public resetZoomChart(): void {
    this.lineChart.resetZoom();
  }

  public askExportDatas(): void {
    const values = [...this.chart.datas.variables.map( (v:any) => v.values)];
    this.exportAsCsvService.exportToCsv(values[0], 'exportedData.csv');
  }
}
