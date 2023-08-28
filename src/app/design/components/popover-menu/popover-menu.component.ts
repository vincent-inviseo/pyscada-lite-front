import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-popover-menu',
  templateUrl: './popover-menu.component.html',
  styleUrls: ['./popover-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverMenuComponent {
}
