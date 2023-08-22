import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetComponent } from './widget.component';
import { GraphsModule } from 'src/app/pyscada-lite/graphs/graphs.module';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';

@NgModule({
  declarations: [WidgetComponent],
  imports: [
    CommonModule,
    GraphsModule, 
    CalendarModule,
    FormsModule
],
providers: [DialogService],
  exports: [WidgetComponent],
})
export class WidgetModule {}
