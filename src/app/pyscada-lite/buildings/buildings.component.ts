/* eslint-disable @typescript-eslint/no-explicit-any */

import { Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { DialogService } from 'primeng/dynamicdialog';
import { BuildingService } from 'src/app/requests/building.service';
import { PageService } from 'src/app/requests/page.service';
import { Router } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.scss'],
  providers: [DialogService]
})
export class BuildingsComponent implements OnInit {

  public search = '';

  public buildings: any[] = [];

  public pages: any[] = [];

  constructor(
    private readonly buildingService: BuildingService,
    private readonly pageService: PageService,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    this.getBuildingsList();
  }

  public getBuildingsList(): void {
    this.buildingService.getBuildings().subscribe((buildings) => {
      this.buildings = buildings;
    })
  }

  public getPages(): void {
    this.pageService.getPages().subscribe((pages) => {
      this.pages = pages;
    })
  }

  public navigateToDefaultPage(building_id: any): void {
    this.pageService.getPagesByBuildingId(building_id).subscribe((pages) => {
      if (pages.pages.length > 0) {
        //this.router.navigateByUrl("/buildings/building_id=" + building_id + "/page=" + pages.pages[0].link_name);
        this.router.navigate(["/buildings/", building_id, "pages", pages.pages[0].id]);
      }
      else {
        this.router.navigate(["/buildings/", building_id, "pages"]);
      }

    })
  }

  public update($event : any) {
    this.search = $event;
  }
}
