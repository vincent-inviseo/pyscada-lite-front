/* eslint-disable @angular-eslint/component-selector */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InputBoolean } from 'src/app/design/decorators/input-boolean';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() public size: 'small' | 'medium' | 'large' = 'medium';

  @Input() public bgColor: 'primary-color' | 'white' | 'blue' | 'light' | 'red' = 'white';

  @Input() public type: 'submit' | 'button' = 'button';

  @Input() public icon = '';

  @Input() @InputBoolean() public loading: boolean | string = false;

  @Input() @InputBoolean() public ghost: boolean | string = false;

  @Input() @InputBoolean() public disabled: boolean | string | null = false;

  @Input() @InputBoolean() public dashed: boolean | string = false;

  @Input() @InputBoolean() public reverse: boolean | string = false;

  @Input() @InputBoolean() public checkbox: boolean | string = false;

  @Input() @InputBoolean() public full: boolean | string = false;

  @Input() @InputBoolean() public iconRight: boolean | string = false;

  @Input() @InputBoolean() public iconOnly: boolean | string = false;
}

