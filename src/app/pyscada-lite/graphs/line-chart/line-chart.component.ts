/* eslint-disable @typescript-eslint/no-explicit-any */

import { Component, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';
import { DateCleanerGraphService } from 'src/app/services/date-cleaner-graph.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})

export class LineChartComponent implements AfterViewInit, OnChanges {

  constructor(private readonly dateCleanerGraphService: DateCleanerGraphService) {}

  @Input() public id!: string;

  @Input() public chart!: any;

  @Input() public chartWidth = "";

  @Input() public chartHeight = "";

  @Input() public resetZoom = false;

  public labelsValues = ["LUN", "MAR", "MER", "JEU", "VEN", "SAM", "DIM"];
  public valuesCurrentWeek = [55, 49, 44, 24, 15, 30, 60];
  public valuesLastWeek = [40, 45, 48, 30, 10, 25, 50];

  public colorCurrentWeek = "#4C0BC6";
  public colorLastWeek = "#27BEF2";

  public yAxisUnit = "kW"

  /*

  public yAxisMin = Math.min(Math.min(...this.valuesCurrentWeek), Math.min(...this.valuesLastWeek));
  public yAxisMax = Math.max(Math.max(...this.valuesCurrentWeek), Math.max(...this.valuesLastWeek));

  */

  
  // Not necessary, used as title of widget
  // public title = "";

  public xAxislabels: string[] = [];
  public yAxisLabel = "";
  public datasetslabels: string[] = [];

  public datasetsData: any[] = [];

  public valuesSet: number[] = []

  /*

  public valuesSet1: number[] = [];
  public valuesSet2: number[] = [];

  */

  public colorSet1 = "#4C0BC6";
  public colorSet2 = "#27BEF2";

  

  // After valuesSet1 and valuesSet2 are defined
  // public yAxisMin = Math.min(Math.min(...this.valuesSet1), Math.min(...this.valuesSet2));
  // public yAxisMax = Math.max(Math.max(...this.valuesSet1), Math.max(...this.ValuesSet2));

  

  public lineChart!: Chart<"line", number[], string>;

  public ngAfterViewInit(): void { 
    Chart.register(zoomPlugin);
    this.setLineChartDefaultValues();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['resetZoom'].previousValue != undefined) {
      this.resetZoomChart();
    }
  }

  // Takes all values without taking into account aggregation or calendar date range
  // Note: need to handle case of a variable with no value at a given time
  public setAllValuesDatasets(chart: any) {
    const variables = chart.datas.variables;
    for (let i = 0; i < variables.length; i++) {
      this.valuesSet = [];
      const variable = variables[i];
      const valuesList = variable.values.value;
      this.datasetslabels.push(variable.name);
      for (let j = 0; j < valuesList.length; j++) {
        const cleanRecordedAt = this.dateCleanerGraphService.cleanDate(valuesList[j].recordedAt);
        if (cleanRecordedAt && i == 0) {
          this.xAxislabels.push(cleanRecordedAt.toString());
        }
        else if (i == 0) {
          this.xAxislabels.push(valuesList[j].recordedAt);
        }
        this.valuesSet.push(valuesList[j].value);
      }
      this.datasetsData.push(this.valuesSet);
    }
  }

  public setDatasetsLineChart(): void {
    for (let i = 0; i < this.datasetsData.length; i++) {
      const dataset =
      {
        data: this.datasetsData[i],
        // backgroundColor: not defined as of now
      };
      this.lineChart.data.datasets.push(dataset);
    }
  }

  // TODO
  public setLineChart(): void {
    Chart.defaults.font.family = "var(--main-title-font-family)"
    /*
    this.lineChart = new Chart(this.id) {

    }
    */
  }

  public setLineChartDefaultValues() {
    Chart.defaults.font.family = "Baloo 2";
    this.lineChart = new Chart(this.id, {
      type: 'line',
      data: {
        labels: this.labelsValues,
        datasets: [
          {
            label: "Wine types",
            data: this.valuesCurrentWeek,
            backgroundColor: this.colorCurrentWeek,
            borderColor: this.colorCurrentWeek,
            pointRadius: 0,
            tension: 0.35
          },
          {
            label: "Wine types last week",
            data: this.valuesLastWeek,
            backgroundColor: this.colorLastWeek,
            borderColor: this.colorLastWeek,
            pointRadius: 0,
            tension: 0.35
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: this.yAxisUnit,
              font: {
                  family: "Baloo2"
              },
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
                family: "Baloo2",
                 size: 15
              },
              usePointStyle: true,
              pointStyle: 'circle'
            },
          },
          title: {
            display: true,
            text: "World Wine Production 2018",
            padding: {
              top: 10
            },
            font: {
              family: "bolder Baloo2",
              size: 20
            },
          },
          tooltip: {
            callbacks: {
              label: () => (''),
              title: () => (''),
              afterBody: (items) => {
                return ("" + items[0].raw + ' ' + this.yAxisUnit);
              },
            },
            displayColors: false,
            titleFont: {
              family: "Baloo2",
            },
            titleAlign: 'center',
          }
        },
        interaction: {
          mode: 'nearest',
          intersect: false
        },
      }
    });
  }

  public resetZoomChart(): void {
    this.lineChart.resetZoom();
  }
}
