import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastItemComponent } from './toast-item.component';



@NgModule({
  declarations: [
    ToastItemComponent,
  ],
  exports: [
    ToastItemComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class ToastItemModule { }

