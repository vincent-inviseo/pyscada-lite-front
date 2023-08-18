import { Component, Input, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements AfterContentInit {

  @Input() public graphType: 'barGraph' | 'doughnut' | 'gauge' | 'lineChart' | 'loadProfile' | 'none' = 'none';

  @Input() public id!: string;

  @Input() public chartWidth = "";

  @Input() public chartHeight = "";

  @Input() public resetZoom = false;

  /* ToDO @Input() in each graph */
  @Input() public generateCsv = false;

  public ngAfterContentInit() {
    this.id = this.id + `_${Math.floor(Math.random() * 10000 + 1)}`;
  }
}
