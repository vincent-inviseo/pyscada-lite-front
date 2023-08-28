import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-popover-menu-item',
  templateUrl: './popover-menu-item.component.html',
  styleUrls: ['./popover-menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverMenuItemComponent {
}
