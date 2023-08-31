/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/component-selector */
import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, Output, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputBoolean } from 'src/app/design/decorators/input-boolean';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() public label = '';

  @Input() @InputBoolean() public disabled: boolean | string = false;

  @Input() @InputBoolean() public required = false;

  @Input() public objectId = '';

  @Output() public objectChange:EventEmitter<any> = new EventEmitter<any>();

  @Output() public changed: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() public _value = false;

  public get value(): boolean {
    return this._value;
  }

  public set value(v: boolean) {
    if (v === this._value) {
      return;
    }
    this._value = v;
    this.onChange(v);
  }

  public id!: string;

  constructor() {
    this.id = `input_${Math.floor((Math.random() * 1000) + 1)}`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private onChange: (v: any) => void = (v: any) => {
    this.changed.emit(v);
    this.objectChange.emit(this.objectId);
  };

  public onTouch = (): void => { };

  public registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  public writeValue(v: boolean): void {
    this._value = v;
    this.onChange(v);
  }

  public change(model: boolean): void {
    this.writeValue(model);
  }
}
