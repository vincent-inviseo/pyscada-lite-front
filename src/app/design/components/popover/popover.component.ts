/* eslint-disable @typescript-eslint/ban-types */
import { Component, Input, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnChanges {

  @Input() public hover: boolean | string = false;

  @Input() public list: boolean | string = false;

  @Input() public popoverTpl!: TemplateRef<{}>;

  @Input() public pos: 'top' | 'bottom' | 'left' | 'right' = 'top';

  @Input() public align: 'left' | 'right' | 'center' = 'center';

  @Input() public bgColor = '';

  @Input() public size: 's' | 'm' | 'l' = 'm';

  public initClickOut = false;

  public showPopover = false;

  public popoverClass = '';

  public setClass(): void {
    if (this.align) {
      this.popoverClass += ' popover--' + this.align + 'aligned';
    }
    if (this.bgColor) {
      this.popoverClass += ' popover--' + this.bgColor;
    }
    if (this.list) {
      this.popoverClass += ' popover--list';
    }
  }

  public onClickedOutside(): void {
    if (!this.hover) {
      this.close();
    }
  }

  public toggle(): void {
    this.showPopover = !this.showPopover;
  }

  public open(): void {
    if (this.showPopover) {
      return;
    }

    this.showPopover = true;

    setTimeout(() => {
      this.initClickOut = true;
    }, 100);
  }

  public close(): void {
    this.showPopover = false;
    this.initClickOut = false;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['align'] || changes['bgColor'] || changes['popoverClass']) {
      this.setClass();
    }
  }
}
