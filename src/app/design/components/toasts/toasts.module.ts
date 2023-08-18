import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastsComponent } from './toasts.component';
import { ToastItemModule } from 'src/app/design/components/toast-item/toast-item.module';

@NgModule({
  declarations: [
    ToastsComponent,
  ],
  imports: [
    CommonModule,
    ToastItemModule,
  ],
  exports: [
    ToastsComponent,
  ],
})
export class ToastsModule { }
