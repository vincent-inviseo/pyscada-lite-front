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

  public ngAfterViewInit(): void {
    this.widgetDateInputId = this.widgetDateInputId + `_${Math.floor(Math.random() * 10000 + 1)}`;
  }

  public ngOnInit(): void {
    this.idGraph = this.idGraph + `_${Math.floor(Math.random() * 10000 + 1)}`;
  }

}
