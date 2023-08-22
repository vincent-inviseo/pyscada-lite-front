/* eslint-disable @typescript-eslint/no-explicit-any */

import { Component, Input, AfterViewInit, OnInit } from '@angular/core';
import { ChartType } from 'src/app/models/chart-type';
import { ExportDataAsCsvService } from 'src/app/services/export-as-csv';
import { ZoomModalComponent } from 'src/app/pyscada-lite/graphs/zoom-modal/zoom-modal.component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements AfterViewInit, OnInit {

  public chartTypes = new ChartType();

  @Input() public title = "";

  @Input() public idGraph!: string

  @Input() public chart!: any

  @Input() public chartWidth = ""

  @Input() public chartHeight = "";

  @Input() public colorLoneValue = "var(--main-blue)";

  @Input() public loneValue!: string;

  @Input() public unitLoneValue!: string;

  @Input() public datePattern!: string;

  @Input() public widgetDateInputId!: string;

  public chartType = 'number';

  public rangeDates!: any;

  public idDropdownContent!: string;

  public resetZoom = false;

  /* ToDO form for the generation of the csv file */
  public generateCsv = false;

  constructor(
    private readonly exportAsCsvService: ExportDataAsCsvService,
    private readonly primeNgDialogService: DialogService,
  ) {}

  public ngAfterViewInit(): void {
    this.widgetDateInputId = this.widgetDateInputId + `_${Math.floor(Math.random() * 10000 + 1)}`;
  }

  public ngOnInit(): void {
    this.chartType = this.chartTypes.getNameByValue(this.chart.chart.chartType);  
    this.idGraph = this.idGraph + `_${Math.floor(Math.random() * 10000 + 1)}`;
    this.idDropdownContent = `dropdownContent_${Math.floor(Math.random() * 10000 + 1)}`;
    
    // Close the dropdown menu if the user clicks outside of it
    window.onclick = (event: any) => {
      if (!event.target.matches('i.pi.pi-ellipsis-v')) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
          const openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    }
  }

  public zoomGrapModal(chart:any): void {
    const dialog = this.primeNgDialogService.open(ZoomModalComponent, {
      data: chart
    });

  }

  public showDropdownContent(): void {
    document.getElementById(this.idDropdownContent)?.classList.toggle("show");
  }

  public askResetZoomChart(): void {
    this.resetZoom = !this.resetZoom;
  }

  public askExportDatas(chart:any): void {
    let values = [...this.chart.datas.variables.map( (v:any) => v.values.value)]
    this.exportAsCsvService.exportToCsv(values[0], 'exporteddata.csv') 
  }
}
