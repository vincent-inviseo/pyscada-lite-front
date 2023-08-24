/* eslint-disable @typescript-eslint/no-explicit-any */

import { Component, AfterViewInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';
import { ChartService } from 'src/app/requests/chart.service';
import { DateCleanerGraphService } from 'src/app/services/date-cleaner-graph.service';
import { ExportDataAsCsvService } from 'src/app/services/export-as-csv';

@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.scss']
})
export class BarGraphComponent implements AfterViewInit, OnChanges {

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

  @Input() public resetZoom = false;

  @Input() public generateCsv = false;

  /*

  public xValues: string[] = ["Italy", "France", "Spain", "USA", "Argentina", "test"];
  public yValues2023: number[] = [55, 49, 44, 24, 15, 30];
  public yValues2022: number[] = [60, 55, 48, 30, 25, 15];

  public yAxisUnit = "kW";

  */

  public xAxisLabels: string[] = [];
  public yAxisLabel = "";
  public datasetsLabels: any[] = [];

  public datasetsData: any[] = [];

  public valuesSet: number[] = [];

  public colorBlue = "#4C0BC6";
  public colorLightBlue = "#CCBEFF";
  public datasetsbackgroundColors: string[] = [this.colorBlue, this.colorLightBlue];

  public barBlue: string[] = [];
  public barLightBlue: string[] = [];

  public isInitialChartWithData = false;

  public barGraph!: Chart<"bar", number[], string>;

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

        ctx.font = "30px Baloo2";
        ctx.fillStyle = 'black';
        ctx.fillText('Pas de données disponibles pour ces dates', left + width / 2, top + height / 2);
      }
    }
  };

  public ngAfterViewInit(): void {
    // this.opacityColors(this.yValues2023, this.yValues2022);
    // this.opacityColors(this.yValuesSet1, this.yValuesSet2);

    for (let i = 0; i < this.chart.datas.variables.length; i++) {
      if (this.chart.datas.variables[i].values.length > 0) {
        this.isInitialChartWithData = true;
      }
    }
    if (this.isInitialChartWithData) {
      this.setAllValuesDatasets(this.chart);
      Chart.register(zoomPlugin);
      this.setBarGraph();
      this.barGraph.data.labels = this.xAxisLabels;
      this.setDatasetsBarGraph();
      this.barGraph.update();
    }
    else {
      Chart.register(zoomPlugin);
      this.setBarGraph();
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
        this.chartService.getVariablesValuesByRangeDatesAndChartId(this.chart.chart.id, date_start, date_end).subscribe((variablesValues) => {
          this.chart.datas.variables = variablesValues;
          this.updateBarGraph(this.chart);
        })
      }
    }
  }

  public updateBarGraph(chart: any): void {
    this.setAllValuesDatasets(chart);
    this.barGraph.data.labels = this.xAxisLabels;
    this.setDatasetsBarGraph();
    this.barGraph.update();
  }

  /*
  // For barGraph with 2 datasets stacked
  public opacityColors(yValues: number[], yValuesAlter: number[]) : void {
    const length = yValues.length;
    for (let i = 0; i < length; i++) {
      if (yValues[i] < yValuesAlter[i] ) {
        this.barBlue.push(this.colorBlue);
        this.barLightBlue.push(this.colorLightBlue);
      }
      else {
        this.barBlue.push(this.colorBlue + "20")
        this.barLightBlue.push(this.colorLightBlue);
      }
    }
  }
  */

  // Takes all values without taking into account aggregation or calendar date range
  // Note: need to handle case of a variable with no value at a given time
  public setAllValuesDatasets(chart: any) {
    this.datasetsData = [];
    this.datasetsLabels = [];
    this.xAxisLabels = [];
    this.yAxisLabel = chart.chart.legende_axe_y;
    const variables = chart.datas.variables;
    for (let i = 0; i < variables.length; i++) {
      this.valuesSet = [];
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
      this.datasetsData.push(this.valuesSet);
    }
  }

  public setDatasetsBarGraph(): void {
    this.barGraph.data.datasets = [];
    for (let i = 0; i < this.datasetsData.length; i++) {
      let dataset: any;
      if (i < this.datasetsbackgroundColors.length) {
        dataset =
        {
          backgroundColor: this.datasetsbackgroundColors[i],
          label: this.datasetsLabels[i],
          data: this.datasetsData[i],
          borderRadius: 15,
          borderWidth: 1,
          //barThickness: 25,
          categoryPercentage: 1.0,
          barPercentage: 1.0
        };
      }
      else {
        dataset =
        {
          label: this.datasetsLabels[i],
          data: this.datasetsData[i],
          borderRadius: 15,
          borderWidth: 1,
          //barThickness: 25,
          categoryPercentage: 0.5,
          barPercentage: 0.5
        };
      }
      this.barGraph.data.datasets.push(dataset);
    }
  }

  public setBarGraph() : void {
    Chart.defaults.font.family = "Baloo2";
    this.barGraph =  new Chart(this.id, {
      type: 'bar',
      data: {
        labels: [], // this.xValues,
        datasets: [
          /*
        {
          backgroundColor: this.barBlue,
          label: "2023",
          data: this.yValues2023, // this.yValuesSet1, 
          borderRadius: 15,
          borderWidth: 1,
          //barThickness: 25,
          categoryPercentage: 0.5,
          barPercentage: 0.5
        },
        {
          backgroundColor: this.barLightBlue,
          label: "2022",
          data: this.yValues2022, // this.yValuesSet2, 
          borderRadius: 15,
          borderWidth: 1,
          //barThickness: 25,
          categoryPercentage: 0.5,
          barPercentage: 0.5
        }
      */]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            stacked: false,
            title: {
              display: true,
              text: this.yAxisLabel,
            }
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
                size: 15
              }
            }
          },
          tooltip: {
            enabled: true,
            // Setup to possibly add unit in tooltip at some point
            /*
            callbacks: {
              label: (tooltipItems: any) => { 
                return tooltipItems.dataset.label + ": " + tooltipItems.raw//tooltipItems.yLabel; //tooltipItems.dataset.label;
              }
            }
            */
            /*
            callbacks: {
              footer: (items: any) => {
                const percentage = ((100 * items[0].raw / items[1].raw) - 100).toFixed(2);
                if (Number(percentage) >= 0) {
                  return "+" + `${percentage}` + '%'
                }
                else {
                  return "" + `${percentage}` + '%'
                }
              } 
            }
            */
          },
        },
        interaction: {
          intersect: true,
          mode: 'index'
        }
      },
      plugins: [this.noData]
    });
  }

  public resetZoomChart(): void {
    this.barGraph.resetZoom();
  }

  public askExportDatas(): void {
    let values = [...this.chart.datas.variables.map( (v:any) => v.values)];
    this.exportAsCsvService.exportToCsv(values[0], 'exportedData.csv');
  }
}
