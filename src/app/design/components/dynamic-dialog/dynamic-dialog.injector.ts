/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injector, Type, InjectionToken, InjectFlags } from '@angular/core';

export class DynamicDialogInjector implements Injector {

  constructor(private _parentInjector: Injector, private _additionalTokens: WeakMap<any, any>) { }

  public get<T>(token: Type<T> | InjectionToken<T>, notFoundValue?: T, flags?: InjectFlags): T;
  public get(token: any, notFoundValue?: any): any;
  public get(token: any, notFoundValue?: any, _?: any): any {
    const value = this._additionalTokens.get(token);

    if (value) return value;

    return this._parentInjector.get<any>(token, notFoundValue);
  }
}
