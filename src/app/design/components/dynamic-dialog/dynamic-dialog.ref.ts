/* eslint-disable @typescript-eslint/no-explicit-any */
import { Observable, Subject } from 'rxjs';

export class DynamicDialogRef {
  public close(result?: any): void {
    this._onClose.next(result);
  }

  public destroy(): void {
    this._onDestroy.next(null);
  }

  private readonly _onClose = new Subject<any>();

  public onClose: Observable<any> = this._onClose.asObservable();

  private readonly _onDestroy = new Subject<any>();

  public onDestroy: Observable<any> = this._onDestroy.asObservable();
}
