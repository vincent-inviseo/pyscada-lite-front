/* eslint-disable @typescript-eslint/no-explicit-any */

import { Component, AfterViewInit, Input } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.scss']
})

export class GaugeComponent implements AfterViewInit {

  @Input() public id!: string;

  @Input() public chart!: any;

  @Input() public chartWidth = "";

  @Input() public chartHeight = "";

  public label: string[] = ["Water consumption"];
  public percentage = 55;
  public gaugeColor = "#4C0BC6"

  public ngAfterViewInit(): void {
    this.setGauge();
  }

  gaugeCenterText = {
    id: 'gaugeCenterText',
    afterDatasetsDraw: (chart: any) => {
      const { ctx } = chart;
      if (chart._active.length > 0 && chart._active[0].index == 0) {
        const value = chart.config.data.datasets[chart._active[0].datasetIndex].data[chart._active[0].index];
        ctx.save();
        const x = chart.getDatasetMeta(0).data[0].x;
        const y = chart.getDatasetMeta(0).data[0].y;
        ctx.font = "60px Baloo2";
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(value + '%', x, y);
        chart.update();
      }
    }
  };

  public setGauge() {
    Chart.defaults.font.family = "Baloo2";
    new Chart(this.id, {
      type: 'doughnut',
      data: {
        labels: this.label,
        datasets: [
          {
            label:"",
            data: [this.percentage, 100 - this.percentage],
            backgroundColor: [this.gaugeColor, "#E4E4F4"],
            borderRadius: 50
          },
        ]
      },
      options: {
        maintainAspectRatio: false,
        circumference: 180,
        rotation: 270,
        cutout: '90%',
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            position: 'bottom',
            text: "Water consumption",
            padding: {
              top: 10
            },
            font: {
              family: "bolder Baloo2",
              size: 30
              },
              color: this.gaugeColor
            },
          tooltip: {
            enabled: false,
          },
        },
      },
      plugins: [this.gaugeCenterText]
    })
  }
}
