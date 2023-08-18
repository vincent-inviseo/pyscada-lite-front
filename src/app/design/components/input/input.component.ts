/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/component-selector */
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: InputComponent,
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor, Validator {
  /**
   * Define if the input is required
   */

  @Input() public required = false;

  @Input() public placeholder = '';

  @Input() public type: 'text' | 'number' | 'email' | 'tel' | 'password' | 'datetime-local' |'date' = 'text';

  @Input() public error!: string;

  @Input() public errors!: string[] | undefined;

  @Input() public rightIcon!: string;

  @Input() public min!: number;

  @Input() public minLength!: number;

  @Input() public max!: number;

  @Input() public maxLength!: number;
  
  @Input() public disabled = false;

  @Input() public pattern!: string | RegExp;

  @Input() public isUpperCase = false;

  @Input() public isSpaceAuthorized = true;

  @Input() public dateValue: Date = new Date('now');

  @Output() public update: EventEmitter<string | number> = new EventEmitter<string | number>();
  @Output() public UpdateDate: EventEmitter<Date> = new EventEmitter<Date>();

  /**
   * Name of the field
   */
  @Input() public label!: string;

  public control!: AbstractControl;

  private _value: string | number = '';

  public get value(): string | number {
    return this._value;
  }

  public set value(v: string | number) {
    if (v === this._value) {
      return;
    }

    if (typeof v === 'string') {
      if (!this.isSpaceAuthorized) {
        v = v.replace(/\s/g, '');

      }
      if (this.isUpperCase) {
        v = v.toUpperCase();
      }
    }

    this._value = v;
    this.update.emit(v);
    this.onChange(v);
  }

  public show = false;

  public id!: string;

  constructor() {
    this.id = `input_${Math.floor(Math.random() * 10000 + 1)}`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private onChange: (_: any) => void = (_: any) => { };

  public onTouch = (): void => { };

  public registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  public writeValue(v: string | number): void {
    this._value = v;
    this.onChange(v);
  }

  public change(model: string | number): void {
    this.writeValue(model);
  }

  public onShow(): void {
    this.show = !this.show;
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    this.control = control;

    return null;
  }

  public onSpace($event: any): void {
    if (!this.isSpaceAuthorized) {
      $event.preventDefault();
    }
  }

  public updateDate($event:any): void
  {
    this.UpdateDate.emit($event?.target?.value);
  }
}
