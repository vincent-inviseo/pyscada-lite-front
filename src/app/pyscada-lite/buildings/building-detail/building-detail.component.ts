/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { StorageService } from 'src/app/authentication/services/storage.service';

@UntilDestroy()
@Component({
  selector: 'app-building-detail',
  templateUrl: './building-detail.component.html',
  styleUrls: ['./building-detail.component.scss']
})
export class BuildingDetailComponent {

  public customer: any;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly storageService: StorageService
  )
  {}
}
