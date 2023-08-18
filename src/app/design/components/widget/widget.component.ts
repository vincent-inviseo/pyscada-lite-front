/* eslint-disable @typescript-eslint/no-explicit-any */

import { Component, Input, AfterViewInit, OnInit } from '@angular/core';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements AfterViewInit, OnInit {

  @Input() public title = "";

  @Input() public idGraph!: string

  @Input() public chartType = "none";

  @Input() public chartWidth = ""

  @Input() public chartHeight = "";

  @Input() public colorLoneValue = "";

  @Input() public loneValue!: string;

  @Input() public unitLoneValue!: string;

  @Input() public datePattern!: string;

  @Input() public widgetDateInputId!: string;

  public rangeDates!: any;

  public idDropdownContent!: string;

  public resetZoom = false;

  /* ToDO form for the generation of the csv file */
  public generateCsv = false;

  public ngAfterViewInit(): void {
    this.widgetDateInputId = this.widgetDateInputId + `_${Math.floor(Math.random() * 10000 + 1)}`;
  }

  public ngOnInit(): void {
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

  public showDropdownContent(): void {
    document.getElementById(this.idDropdownContent)?.classList.toggle("show");
  }

  public askResetZoomChart(): void {
    this.resetZoom = !this.resetZoom;
  }

  public askExportDatas(): void {
    this.generateCsv = !this.generateCsv;
  }
}
