/* eslint-disable @typescript-eslint/no-explicit-any */

import { Component } from '@angular/core';
import { CsvFormatValidatorService } from 'src/app/services/csv-format-validator.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { VariableService } from 'src/app/requests/variable.service';

@Component({
  selector: 'app-import-data',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component.scss']
})
export class ImportDataComponent {

  constructor(
    private readonly csvFormatValidatorService: CsvFormatValidatorService,
    private readonly variableService: VariableService,
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.importStep = this.config.data.importStep;
  }

  public csvFile!: File;

  public importStep!: number

  public variablesNames: any[] = [];

  public variablesUnits: any[] = [];

  public variablesValues: any[] = [];

  public variablesToImport: any[] = [];

  public errorParseCsv = false;

  public availableBtn  = false;

  public vaccanttoggle  = false;

  public loading = false;

  public getVariablesAndValuesFromCsv($event: any): void {
    this.csvFile = $event.target.files[0];
    this.csvFormatValidatorService.getHeadersFromFile(this.csvFile).then((headers) => {
      let variablesNames: string[] = [];
      let variablesUnits: string[] = [];
      const headersLength = headers.length;
      let label: string[];
      let labelValues: string[];
      for (let i = 0; i < headersLength - 1; i++) {
        label = Object.keys(headers[i]);
        if (label[0] === 'Label') {
          labelValues = Object.values(headers[i]);
          labelValues = Object.values(labelValues[0]);
          for (let j = 0; j < labelValues.length; j++) {
            /* x is the variable for the dates of a variable however it is the same name
               for all variables while dates are not necessary the same between the variables of a chart in Pyscada */
            if (labelValues[j] !== 'x') {
              variablesNames.push(labelValues[j]);
            }
          }
        }
        else if (label[0] === 'Unité') {
          labelValues = Object.values(headers[i]);
          labelValues = Object.values(labelValues[0]);
          variablesUnits = labelValues;
          let variablesUnitsLength = variablesUnits.length;
          let j = 0;
          /* unit of x axis is in ms */
          /* Removes unit for the x axis to keep only units of variables */
          while (j < variablesUnitsLength) {
            variablesUnits.splice(j, 1);
            j++;
            variablesUnitsLength = variablesUnits.length;
          }
        }
      }
      // variablesUnits.splice(0,1);
      this.variablesNames = variablesNames;
      this.variablesUnits = variablesUnits;
      let rowValues: any[];
      let variablesValues: any[] = []
      let jsonVariable: any;
      for (let i = 0; i < variablesNames.length; i++) {
        jsonVariable = {
          recordedAt: [],
          [this.variablesNames[i]]: []
        }
        variablesValues.push(jsonVariable);
      }
      this.csvFormatValidatorService.parseEntireCsvFile(this.csvFile).then((data) => {
        const dataLength = data.length;
        let k: number;
        let recordedAt: string;
        let recordedAtDate: Date;
        for (let i = headersLength - 1; i < dataLength; i++) {
          rowValues = Object.values(data[i])
          /* k represents the indexes of the variables in rowValues */
          k = 2;
          while (k < rowValues.length) {
            /* add recordedAt values to variable */
            recordedAtDate = new Date(Number(rowValues[k - 1]));
            recordedAt = recordedAtDate.toISOString();
            variablesValues[(k - 2) / 2].recordedAt.push(recordedAt);
            /* Add value to variable */
            variablesValues[(k - 2) / 2][this.variablesNames[(k - 2) / 2]].push(rowValues[k]);
            k = k + 2;
          }
        }
        this.variablesValues = variablesValues;
        for (let i = 0; i < this.variablesValues.length; i++) {
          this.variablesToImport.push(this.variablesValues[i]);
        }
        this.importStep++;
      }).catch(() => {
        this.errorParseCsv = true;
      });
    }).catch(() => {
      this.errorParseCsv = true;
    });
  }

  public changeVariablesList($event: any): void {
    const indexVariableName = this.variablesNames.indexOf($event);
    const variableValues = this.variablesValues[indexVariableName];
    const index = this.variablesToImport.indexOf(variableValues);
    if (index > -1) {
      this.variablesToImport.splice(index, 1);
    } else {
      this.variablesToImport.push(variableValues);
    }
  }

  public dropdownVariables(value: any): void {
    if(value==1){
      this.availableBtn = !this.availableBtn;
    }
    if(value==2){
      this.vaccanttoggle = !this.vaccanttoggle;
    }
  }

  public submitVariablesImport(): void {
    let variableName: string;
    let indexVariable: number;
    /* Need to add a view to link a variable to a chart */

    /* Case creation of the variables */
    for (let i = 0; i < this.variablesToImport.length; i++) {
      const json_variable_unit = {
        unit_unit: '',
        unit_description: '',
        unit_udunit: '',
        name: '',
        description: '',
        data_type: ''
      };
      variableName = Object.keys(this.variablesToImport[i])[1];
      indexVariable = this.variablesNames.indexOf(variableName);
      json_variable_unit.unit_unit = this.variablesUnits[indexVariable];
      json_variable_unit.unit_description = variableName;

      json_variable_unit.name = variableName;
      /* Note: Data type to define */
      json_variable_unit.data_type = "FLOAT32";
      /* Does not seem to create variable */
      // this.variableService.postVariableAndUnit(json_variable_unit);
    }
    this.importStep++;
  }
}