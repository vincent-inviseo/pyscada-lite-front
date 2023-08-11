import { Component, AfterViewInit, Input } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-load-profile',
  templateUrl: './load-profile.component.html',
  styleUrls: ['./load-profile.component.scss']
})
export class LoadProfileComponent implements AfterViewInit {

  @Input() public chartWidth: string = ""

  @Input() public chartHeight: string = "";

  @Input() public id!: string;

  public idLegend!: string;

  constructor() {
    this.idLegend = `legendLoadProfile_${Math.floor(Math.random() * 10000 + 1)}`;
  }

  public yLabelsValues = ["LUN", "MAR", "MER", "JEU", "VEN", "SAM", "DIM"];
  public xLabelValues = ["", "0:00", "", "4:00", "", "8:00", "", "12:00", "", "16:00", "", "20:00", ""];

  public unitLegend = "kW";

  public valuesWeekAt0_2 = [0, 0, 0, 10, 0, 0, 0];
  public valuesWeekAt2_4 = [0, 0, 10, 10, 10, 0, 0];
  public valuesWeekAt4_6 = [0, 10, 0, 10, 0, 10, 0];
  public valuesWeekAt6_8 = [0, 10, 10, 20, 10, 10, 0];
  public valuesWeekAt8_10 = [20, 30, 30, 20, 20, 30, 20];
  public valuesWeekAt10_12 = [20, 30, 40, 30, 20, 30, 20];
  public valuesWeekAt12_14 = [60, 70, 80, 85, 65, 74, 85];
  public valuesWeekAt14_16 = [60, 70, 85, 85, 70, 74, 85];
  public valuesWeekAt16_18 = [40, 50, 35, 60, 45, 52, 51];
  public valuesWeekAt18_20 = [40, 50, 35, 50, 35, 52, 51];
  public valuesWeekAt20_22 = [0, 0, 10, 20, 0, 0, 0];
  public valuesWeekAt22_24 = [0, 0, 0, 10, 0, 0, 0];

  public valuesWeek = [this.valuesWeekAt0_2, this.valuesWeekAt2_4, this.valuesWeekAt4_6, this.valuesWeekAt6_8, this.valuesWeekAt8_10, this.valuesWeekAt10_12, this.valuesWeekAt12_14, 
                  this.valuesWeekAt14_16, this.valuesWeekAt16_18, this.valuesWeekAt18_20, this.valuesWeekAt20_22, this.valuesWeekAt22_24];

  public barSizeWeek = [50, 50, 50, 50, 50, 50, 50];

  public colorsLoadProfile: string[][] = [];
  public datasetsLoadProfile = [];

  /* Gradient for the load profile : color at index 0 for values between 0 and 9, color at index 1 for values between 10 and 19 and so on and so forth */
  public gradientColorsLightToDark = ["#E6DEFF", "#CCBEFF", "#B39EFF", "#997BFF", "#8058FA", "#6739E0", "#5A29D4", "#4C0BC6", "#4200B4", "#36158D"];

  public loadProfileChart!: Chart<"bar", (number | [number, number] | null)[], string>

  public legendLoadProfileChart!: Chart<"bar", (number | [number, number] | null)[], string>

  public ngAfterViewInit(): void {
    Chart.defaults.font.family = "Baloo2";
    this.setLoadProfile();
    this.setColorsLoadProfile(this.valuesWeek);
    this.setDatasetsLoadProfile();
    this.loadProfileChart.update();
    this.setLegendLoadProfile();
    this.setDatasetsLegendLoadProfile();
    this.legendLoadProfileChart.update();
  }

  public setColorsLoadProfile(valuesWeek: any[]): void {
    for (let i = 0; i < this.valuesWeek.length; i++) {
      this.colorsLoadProfile.push([]);  
    }
    let numberDays = valuesWeek[0].length;
    let temp = 0;
    /* Itirates over specific time frames */
    for (let i = 0; i < valuesWeek.length; i++) {
      /* Itirates over each day */
      for (let j = 0; j < numberDays; j++) {
        temp = Math.floor(valuesWeek[i][j] / 10);
        if (temp > 10) {
          temp = 10;
        }
        switch (temp) {
          case 0:
            this.colorsLoadProfile[i].push(this.gradientColorsLightToDark[0]);
            break;
          case 1:
            this.colorsLoadProfile[i].push(this.gradientColorsLightToDark[1]);
            break;
          case 2:
            this.colorsLoadProfile[i].push(this.gradientColorsLightToDark[2]);
            break;
          case 3:
            this.colorsLoadProfile[i].push(this.gradientColorsLightToDark[3]);
            break;
          case 4:
            this.colorsLoadProfile[i].push(this.gradientColorsLightToDark[4]);
            break;
          case 5:
            this.colorsLoadProfile[i].push(this.gradientColorsLightToDark[5]);
            break;
          case 6:
            this.colorsLoadProfile[i].push(this.gradientColorsLightToDark[6]);
            break;
          case 7:
            this.colorsLoadProfile[i].push(this.gradientColorsLightToDark[7]);
            break;
          case 8:
            this.colorsLoadProfile[i].push(this.gradientColorsLightToDark[8]);
            break;
          case 9:
            this.colorsLoadProfile[i].push(this.gradientColorsLightToDark[9]);
            break;
          case 10:
            this.colorsLoadProfile[i].push(this.gradientColorsLightToDark[9]);
            break;
        }
      }
    }
  }

  public setDatasetsLoadProfile(): void {
    for (let i = 0; i < this.valuesWeek.length; i++) {
      var dataset = 
      {
        data: this.barSizeWeek,
        backgroundColor: this.colorsLoadProfile[i],
        stack: 'Stack 0',
      };
      this.loadProfileChart.data.datasets.push(dataset);
    }
  }

  public setDatasetsLegendLoadProfile() {
    for (let i = 0; i < this.gradientColorsLightToDark.length; i++) {
      var dataset =
      {
        data: [50],
        backgroundColor: this.gradientColorsLightToDark[i],
        stack: 'Stack 0',
      };
      this.legendLoadProfileChart.data.datasets.push(dataset);
    }
  }

  customXScaleLoadProfile = {
    id: 'customXScaleLoadProfile',
    beforeDatasetsDraw: (chart: any) => {
      const {ctx, scales: {x, y}} = chart;
      ctx.save();
      for (var i = 0; i <= x.ticks.length + 7; i++) {
        if (i != 0) {
          ctx.font = '13px Baloo2';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
          if (i == 1) {
            ctx.fillText(this.xLabelValues[i], x.getPixelForValue(0), chart.chartArea.bottom);
          }
          else {
            ctx.fillText(this.xLabelValues[i], x.getPixelForValue((i - 1) * 50), chart.chartArea.bottom);
          }
          ctx.restore();
        }
      }
    }
  }

  customXScaleLegend = {
    id: 'customXScaleLegend',
    beforeDatasetsDraw: (chart: any) => {
      const {ctx, scales: {x}} = chart;
      ctx.save();
      for (var i = 0; i < x.ticks.length + 7; i++) {
        if (i != 0) {
          ctx.font = '13px Baloo2';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
          if (i == 1) {
            ctx.fillText(0, x.getPixelForValue(0), chart.chartArea.bottom);
          }
          else {
            ctx.fillText(10 * (i - 1), x.getPixelForValue((i - 1) * 50), chart.chartArea.bottom);
          }
          ctx.restore();
        }
      }
    }
  }

  public setLoadProfile(): void {
    this.loadProfileChart = new Chart(this.id, {
      type: 'bar',
      data: {
        labels: this.yLabelsValues,
        datasets: []
      },
      options: {
        maintainAspectRatio: false,
        indexAxis: 'y',
        scales: {
          x: {
            ticks: {
              maxTicksLimit: 6,
              display: true,
              color: 'transparent',
              padding: 7,
            }
          },
          y: {
            stacked: true,
            ticks: {
              maxTicksLimit : 7,
              display: true
            },
          }
        },
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: "World Wine Production 2018",
            font: {
              family: "Baloo2",
              size: 30
            }
          },
          tooltip: {
            enabled: false
          },
        },
      },
      plugins: [this.customXScaleLoadProfile]
    });
  }

  public setLegendLoadProfile(): void {
    this.legendLoadProfileChart = new Chart(this.idLegend, {
      type: 'bar',
      data: {
        labels: ["legend"],
        datasets: []
      },
      options: {
        indexAxis: 'y',
        scales: {
          x: {
            ticks: {
              maxTicksLimit: 6,
              display: true,
              padding: 7,
              color: 'transparent'
            },
            title: {
              display: true,
              text: this.unitLegend,
              font: {
                family: "Baloo2"
              },
            },
          },
          y: {
            stacked: true,
            ticks: {
              maxTicksLimit : 7,
              display: false
            },
          }
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false
          },
        }
      },
      plugins: [this.customXScaleLegend]
    });
  }
}
