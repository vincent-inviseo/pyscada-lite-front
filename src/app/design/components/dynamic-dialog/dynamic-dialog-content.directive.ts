import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[fcsDynamicDialogContent]',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    'class': 'p-element',
  },
})
export class DynamicDialogContentDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}

