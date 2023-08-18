/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { StorageService } from 'src/app/authentication/services/storage.service';
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
    /*
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly storageService: StorageService,
    */
    private readonly chartService: ChartService
  )
  {}

  
}
