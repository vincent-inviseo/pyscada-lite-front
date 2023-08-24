/* eslint-disable @typescript-eslint/no-explicit-any */

import { Component, AfterViewInit, Input } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styleUrls: ['./doughnut.component.scss']
})

export class DoughnutComponent implements AfterViewInit {

  @Input() public id!: string;

  @Input() public chart!: any;

  @Input() public chartWidth = "";

  @Input() public chartHeight = "";

  @Input() public rangeDates!: any[];

  @Input() public generateCsv = false;

  public labelsValues = ["Italy", "France", "Spain", "USA", "Argentina", "test"];
  public values = [55, 49, 44, 24, 15, 30];
  public colors = ["#4C0BC6", "#02C794", "#FAC528", "#27BEF2", "#EA4C87", "#000000"]

  public canvas = document.getElementById("myChart");

  public sumValues = 0;

  public ngAfterViewInit(): void {
    this.values.forEach(value => { this.sumValues = this.sumValues + value });
    this.setDoughnut();
  }

  centerText = {
    id: 'centerText',
    afterDatasetsDraw: (chart: any) => {
      const { ctx } = chart;
      if (chart._active.length > 0) {
        const value = chart.config.data.datasets[chart._active[0].datasetIndex].data[chart._active[0].index];
        ctx.save();
        const x = chart.getDatasetMeta(0).data[0].x;
        const y = chart.getDatasetMeta(0).data[0].y;
        ctx.font = "30px Baloo2";
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText((100 * value / this.sumValues).toFixed(2) + '%', x, y);
        chart.update();
      }
    }
  };

  public setDoughnut() {
    Chart.defaults.font.family = "Baloo2";
    new Chart(this.id, {
      type: 'doughnut',
      data: {
          labels: this.labelsValues,
          datasets: [
            {
              label: "Wine types",
              data: this.values,
              backgroundColor: this.colors
            }
        ]
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            labels: {
              font: {
                family: "Baloo2",
                size: 1
              }
            }
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
}
