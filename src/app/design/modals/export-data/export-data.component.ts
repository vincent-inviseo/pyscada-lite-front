/* eslint-disable @typescript-eslint/no-explicit-any */

import { Component } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-export-data',
  templateUrl: './export-data.component.html',
  styleUrls: ['./export-data.component.scss']
})
export class ExportDataComponent {

  constructor(
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) {}

  public exportForm: FormGroup = new FormGroup({
    fileName: new FormControl(''),

  })

  public exportData(): void {
    let something = ""
  }



}
