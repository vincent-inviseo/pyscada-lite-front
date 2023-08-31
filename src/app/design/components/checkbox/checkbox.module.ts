import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from './checkbox.component';
import { FormsModule } from '@angular/forms';
import { CheckboxModule as PrimeNgCheckboxModule } from 'primeng/checkbox';



@NgModule({
  declarations: [
    CheckboxComponent,
  ],
  exports: [
    CheckboxComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimeNgCheckboxModule,
  ],
})
export class CheckboxModule { }
