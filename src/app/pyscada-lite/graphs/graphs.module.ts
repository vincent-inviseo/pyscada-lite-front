import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { BarGraphComponent } from './bar-graph/bar-graph.component';
import { DoughnutComponent } from './doughnut/doughnut.component';
import { GaugeComponent } from './gauge/gauge.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { NgChartsConfiguration, NgChartsModule } from 'ng2-charts';
import { LoadProfileComponent } from './load-profile/load-profile.component';
import { GraphsComponent } from './graphs.component';
import { ZoomModalComponent } from './zoom-modal/zoom-modal.component';
import { ExportDataComponentModule } from 'src/app/design/modals/export-data/export-data.module';
import { ImportDataComponent } from './import-data/import-data.component';

@NgModule({
  declarations: [
    BarGraphComponent,
    DoughnutComponent,
    GaugeComponent,
    LineChartComponent,
    LoadProfileComponent,
    GraphsComponent,
    ZoomModalComponent,
    ImportDataComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgChartsModule,
    ExportDataComponentModule
  ],
  exports: [
    BarGraphComponent,
    DoughnutComponent,
    GaugeComponent,
    LineChartComponent,
    LoadProfileComponent,
    GraphsComponent
  ],
  providers: [
    { provide: NgChartsConfiguration, useValue: { generateColors: false }}
  ]
})
export class GraphsModule { }
