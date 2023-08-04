/* eslint-disable @typescript-eslint/no-explicit-any */

import { Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { DialogService } from 'primeng/dynamicdialog';
import { BuildingService } from 'src/app/requests/building.service';

@UntilDestroy()
@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.scss'],
  providers: [DialogService]
})
export class BuildingsComponent implements OnInit {

  public search = '';

  public buildings: any[] = []

  constructor(
    private readonly buildingService: BuildingService
  ) {}

  public ngOnInit(): void {
    this.getBuildingsList();
  }

  public getBuildingsList(): void {
    this.buildingService.getBuildings().subscribe((buildings) => {
      this.buildings = buildings;
    })
  }

  public update($event : any) {
    this.search = $event;
  }
}
