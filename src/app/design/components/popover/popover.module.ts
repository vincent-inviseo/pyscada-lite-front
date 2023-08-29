import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverComponent } from './popover.component';
import { PopoverMenuModule } from 'src/app/design/components/popover-menu/popover-menu.module';
import { PopoverMenuItemModule } from 'src/app/design/components/popover-menu-item/popover-menu-item.module';
import { ClickOutsideDirective } from 'src/app/design/directives/click-outside.directive';

@NgModule({
  declarations: [
    PopoverComponent,
    ClickOutsideDirective,
  ],
  imports: [
    CommonModule,
    PopoverMenuModule,
    PopoverMenuItemModule,
  ],
  exports: [
    PopoverComponent,
  ],
})
export class PopoverModule { }
