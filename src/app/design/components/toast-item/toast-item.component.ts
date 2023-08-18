import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Message } from 'src/app/design/services/toast.service';
import { InputBoolean } from 'src/app/design/decorators/input-boolean';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toast-item',
  templateUrl: './toast-item.component.html',
  styleUrls: ['./toast-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastItemComponent {
  @Input() public msg!: Message;

  @Input() public id = '';

  @Input() @InputBoolean() public underline: boolean | string = true;

  @Input() @InputBoolean() public disabled: boolean | string = false;

  @Output() public erase = new EventEmitter<void>();

  constructor(
    private readonly router: Router,
  ) {
  }

  public onDelete(): void {
    this.erase.emit();
  }

  public onClickCTA(): void {
    if (this.msg.callToAction) {
      void this.router.navigate(this.msg.callToAction?.link);
    }
    this.erase.emit();
  }
}
