/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ChartService } from 'src/app/requests/chart.service';
// import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';

@UntilDestroy()
@Component({
  selector: 'app-building-detail',
  templateUrl: './building-detail.component.html',
  styleUrls: ['./building-detail.component.scss']
})
export class BuildingDetailComponent {

  constructor(
    private readonly chartService: ChartService
  )
  {}

  
}
