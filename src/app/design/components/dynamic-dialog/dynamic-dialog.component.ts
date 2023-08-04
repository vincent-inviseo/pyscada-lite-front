/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  ElementRef,
  NgZone,
  OnDestroy,
  Renderer2,
  Type,
  ViewChild,
  ViewRef
} from '@angular/core';
import { DomHandler } from 'primeng/dom';
import { ZIndexUtils } from 'primeng/utils';
import { DynamicDialogConfig } from 'src/app/design/components/dynamic-dialog/dynamic-dialog.conf';
import { DynamicDialogRef } from 'src/app/design/components/dynamic-dialog/dynamic-dialog.ref';
import { DynamicDialogContentDirective } from 'src/app/design/components/dynamic-dialog/dynamic-dialog-content.directive';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'fcs-dynamic-dialog',
  templateUrl: './dynamic-dialog.component.html',
  styleUrls: ['./dynamic-dialog.component.scss'],
})
export class DynamicDialogComponent implements AfterViewInit, OnDestroy {
  public visible = true;

  public closing = false;

  public componentRef!: ComponentRef<any>;

  public mask!: HTMLDivElement;

  @ViewChild(DynamicDialogContentDirective)
  public insertionPoint!: DynamicDialogContentDirective;

  @ViewChild('mask') public maskViewChild!: ElementRef;

  @ViewChild('container') public container!: ElementRef;

  public childComponentType!: Type<any>;

  public wrapper!: HTMLElement;

  public maskClickListener!: Function | null;

  constructor(
    private readonly cd: ChangeDetectorRef,
    public readonly renderer: Renderer2,
    public readonly config: DynamicDialogConfig,
    private readonly dialogRef: DynamicDialogRef,
    public readonly zone: NgZone,
  ) {
    this.dialogRef.onClose
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.hide();
      });
  }

  public ngAfterViewInit(): void {
    this.loadChildComponent(this.childComponentType);
    this.cd.detectChanges();

    this.wrapper = this.container.nativeElement.parentElement;

    if (this.config.modal !== false) {
      this.enableModality();
    }
  }

  public loadChildComponent(componentType: Type<any>): void {
    const viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent(componentType);
  }

  public onContainerDestroy(): void {
    if (this.container && this.config.autoZIndex !== false) {
      ZIndexUtils.clear(this.container.nativeElement);
    }

    if (this.config.modal !== false) {
      this.disableModality();
    }

    // @ts-ignore
    this.container = null;
  }

  public close(): void {
    this.cd.markForCheck();
  }

  public hide(): void {
    this.closing = true;
    if (this.dialogRef) {
      setTimeout(() => {
        this.visible = false;
        this.onContainerDestroy();
        this.dialogRef.destroy();
        this.dialogRef.close();
      }, 200);
    }
  }

  public enableModality(): void {
    if (this.config.closable !== false && this.config.dismissableMask) {
      this.maskClickListener = this.renderer.listen(
        this.wrapper,
        'mousedown',
        (event: any) => {
          if (this.wrapper && this.wrapper.isSameNode(event.target)) {
            this.hide();
          }
        },
      );
    }

    if (this.config.modal !== false) {
      DomHandler.addClass(document.body, 'p-overflow-hidden');
    }
  }

  public disableModality(): void {
    if (this.wrapper) {
      if (this.config.dismissableMask) {
        this.unbindMaskClickListener();
      }

      if (this.config.modal !== false) {
        DomHandler.removeClass(document.body, 'p-overflow-hidden');
      }

      if (!(this.cd as ViewRef).destroyed) {
        this.cd.detectChanges();
      }
    }
  }

  public unbindMaskClickListener(): void {
    if (this.maskClickListener) {
      this.maskClickListener();
      this.maskClickListener = null;
    }
  }

  public ngOnDestroy(): void {
    this.onContainerDestroy();

    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
