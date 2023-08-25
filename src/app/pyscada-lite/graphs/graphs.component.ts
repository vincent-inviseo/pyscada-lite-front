/* eslint-disable @typescript-eslint/no-explicit-any */

import { Component, Input, AfterContentInit } from '@angular/core';
import { DateCleanerGraphService } from 'src/app/services/date-cleaner-graph.service';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements AfterContentInit {

  constructor(private readonly dateCleanerGraphService: DateCleanerGraphService) {}

  @Input() public graphType: 'barGraph' | 'doughnut' | 'gauge' | 'lineChart' | 'loadProfile' | 'number' = 'number';

  @Input() public id!: string;

  @Input() public chart!: any;

  @Input() public chartWidth = "";

  @Input() public chartHeight = "";

  @Input() public rangeDates!: any[];

  @Input() public resetZoom = false;

  @Input() public generateCsv = false;

  public ngAfterContentInit() {
    this.id = this.id + `_${Math.floor(Math.random() * 10000 + 1)}`;
  }
}
