import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportDataComponent } from './export-data.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { ButtonModule } from '../../components/button/button.module';

@NgModule({
  declarations: [ExportDataComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule
],
providers: [DialogService],
  exports: [ExportDataComponent],
})
export class ExportDataComponentModule {}