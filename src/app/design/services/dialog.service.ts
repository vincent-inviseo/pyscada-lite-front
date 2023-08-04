/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Injectable, ComponentFactoryResolver, ApplicationRef, Injector, Type, EmbeddedViewRef, ComponentRef,
} from '@angular/core';
import { DynamicDialogComponent } from 'src/app/design/components/dynamic-dialog/dynamic-dialog.component';
import { DynamicDialogConfig } from 'src/app/design/components/dynamic-dialog/dynamic-dialog.conf';
import { DynamicDialogInjector } from 'src/app/design/components/dynamic-dialog/dynamic-dialog.injector';
import { DynamicDialogRef } from 'src/app/design/components/dynamic-dialog/dynamic-dialog.ref';

@Injectable()
export class DialogService {
  private dialogComponentRefMap: Map<DynamicDialogRef, ComponentRef<DynamicDialogComponent>> = new Map();

  constructor(
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private readonly appRef: ApplicationRef,
    private readonly injector: Injector) {
  }

  public open(componentType: Type<any>, config: DynamicDialogConfig): DynamicDialogRef {
    const dialogRef = this.appendDialogComponentToBody(config);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.dialogComponentRefMap.get(dialogRef).instance.childComponentType = componentType;

    return dialogRef;
  }

  private appendDialogComponentToBody(config: DynamicDialogConfig): any {
    const map = new WeakMap();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    map.set(DynamicDialogConfig, config);

    const dialogRef = new DynamicDialogRef();
    map.set(DynamicDialogRef, dialogRef);

    const sub = dialogRef.onClose.subscribe(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.dialogComponentRefMap.get(dialogRef).instance.close();
    });

    const destroySub = dialogRef.onDestroy.subscribe(() => {
      this.removeDialogComponentFromBody(dialogRef);
      destroySub.unsubscribe();
      sub.unsubscribe();
    });

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicDialogComponent);
    const componentRef = componentFactory.create(new DynamicDialogInjector(this.injector, map));

    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    this.dialogComponentRefMap.set(dialogRef, componentRef);

    return dialogRef;
  }

  private removeDialogComponentFromBody(dialogRef: DynamicDialogRef): void {
    if (!dialogRef || !this.dialogComponentRefMap.has(dialogRef)) {
      return;
    }

    const dialogComponentRef = this.dialogComponentRefMap.get(dialogRef);

    if (!dialogComponentRef) {
      return;
    }

    this.appRef.detachView(dialogComponentRef.hostView);
    dialogComponentRef.destroy();
    this.dialogComponentRefMap.delete(dialogRef);
  }
}
