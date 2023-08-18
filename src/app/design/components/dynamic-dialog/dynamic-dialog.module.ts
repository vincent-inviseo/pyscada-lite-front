import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicDialogComponent } from './dynamic-dialog.component';
import { DynamicDialogContentDirective } from './dynamic-dialog-content.directive';


@NgModule({
  declarations: [
    DynamicDialogComponent,
    DynamicDialogContentDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DynamicDialogComponent,
  ],
})
export class DynamicDialogModule { }
