/* eslint-disable @typescript-eslint/no-explicit-any */

import { Component, AfterViewInit, Input } from '@angular/core';
import { Chart } from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})

export class LineChartComponent implements AfterViewInit {

  @Input() public id!: string;

  @Input() public chartWidth = "";

  @Input() public chartHeight = "";

  public labelsValues = ["LUN", "MAR", "MER", "JEU", "VEN", "SAM", "DIM"];
  public valuesCurrentWeek = [55, 49, 44, 24, 15, 30, 60];
  public valuesLastWeek = [40, 45, 48, 30, 10, 25, 50];

  public colorCurrentWeek = "#4C0BC6";
  public colorLastWeek = "#27BEF2";

  public yAxisUnit = "kW"

  public yAxisMin = Math.min(Math.min(...this.valuesCurrentWeek), Math.min(...this.valuesLastWeek));
  public yAxisMax = Math.max(Math.max(...this.valuesCurrentWeek), Math.max(...this.valuesLastWeek));

  public lineChart!: Chart<"line", number[], string>;

  public ngAfterViewInit(): void {
    Chart.register(zoomPlugin);
    this.setLineChart();
  }

  public setLineChart() {
    Chart.defaults.font.family = "Baloo2";
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

  public resetZoomChart() {
    this.lineChart.resetZoom();
  }
}
