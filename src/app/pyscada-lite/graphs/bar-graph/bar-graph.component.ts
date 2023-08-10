/* eslint-disable @typescript-eslint/no-explicit-any */

import { Component, AfterViewInit, Input } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.scss']
})
export class BarGraphComponent implements AfterViewInit {

  @Input() public id!: string;

  @Input() public chartHeight: string = "";

  public xValues: string[] = ["Italy", "France", "Spain", "USA", "Argentina", "test"];
  public yValues2023: number[] = [55, 49, 44, 24, 15, 30];
  public yValues2022: number[] = [60, 55, 48, 30, 25, 15];

  public colorBlue = "#4C0BC6";
  public colorLightBlue = "#CCBEFF";

  public yAxisUnit = "kW";

  public barBlue: string[] = [];
  public barLightBlue: string[] = [];

  public ngAfterViewInit(): void {
    this.opacityColors(this.yValues2023, this.yValues2022);
    this.setBarChart();
  }

  public opacityColors(yValues: number[], yValuesAlter: number[]) : void {
    var length = yValues.length;
    for (var i = 0; i < length; i++) {
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

  public setBarChart() : void {
    Chart.defaults.font.family = "Baloo2";
    new Chart(this.id, {
      type: 'bar',
      data: {
        labels: this.xValues,
        datasets: [
        {
          backgroundColor: this.barBlue,
          label: "2023",
          data: this.yValues2023,
          borderRadius: 15,
          borderWidth: 1,
          barThickness: 25,
          stack: 'Stack 0'
        },
        {
          backgroundColor: this.barLightBlue,
          label: "2022",
          data: this.yValues2022,
          borderRadius: 15,
          borderWidth: 1,
          barThickness: 25,
          stack: 'Stack 0'
        }]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            stacked: false,
            title: {
              display: true,
              text: this.yAxisUnit,
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              font: {
                size: 15
              }
            }
          },
          title: {
            display: true,
            text: "World Wine Production 2018",
            font: {
              size: 20
            },
            padding: 10
          },
          tooltip: {
            enabled: true,
            callbacks: {
              footer: (items: any) => {
                let percentage = ((100 * items[0].raw / items[1].raw) - 100).toFixed(2);
                if (Number(percentage) >= 0) {
                  return "+" + `${percentage}` + '%'
                }
                else {
                  return "" + `${percentage}` + '%'
                }
              } 
            }
          },
        },
        interaction: {
          intersect: true,
          mode: 'index'
        }
      }
    });
  }
}
