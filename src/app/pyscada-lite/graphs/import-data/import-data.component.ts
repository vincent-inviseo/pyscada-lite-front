/* eslint-disable @typescript-eslint/no-explicit-any */

import { Component } from '@angular/core';
import { CsvFormatValidatorService } from 'src/app/services/csv-format-validator.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-import-data',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component.scss']
})
export class ImportDataComponent {

  constructor(
    private readonly csvFormatValidatorService: CsvFormatValidatorService,
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.importStep = this.config.data.importStep;
  }

  public csvFile!: File;

  public importStep!: number

  public verifyFormatFile($event: any): void {
    this.csvFile = $event.target.files[0];
    this.csvFormatValidatorService.getHeadersFromFile(this.csvFile).then((formatedDocument) => {
      // DO somethings
      
    }).catch((error) => {
      console.log("error headers", error);
      
    });
  }
}