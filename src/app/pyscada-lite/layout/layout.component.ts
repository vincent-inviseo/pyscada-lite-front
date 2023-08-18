/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {

  public isOpened = true;

  constructor(
  ) {}
}
