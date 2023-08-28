import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetComponent } from './widget.component';
import { GraphsModule } from 'src/app/pyscada-lite/graphs/graphs.module';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { PopoverModule } from '../popover/popover.module';
import { PopoverMenuModule } from '../popover-menu/popover-menu.module';
import { PopoverMenuItemModule } from '../popover-menu-item/popover-menu-item.module';

@NgModule({
  declarations: [WidgetComponent],
  imports: [
    CommonModule,
    GraphsModule, 
    CalendarModule,
    FormsModule,
    PopoverModule,
    PopoverMenuModule,
    PopoverMenuItemModule
],
providers: [DialogService],
  exports: [WidgetComponent],
})
export class WidgetModule {}
