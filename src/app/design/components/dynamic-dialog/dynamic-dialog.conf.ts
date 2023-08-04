/* eslint-disable @typescript-eslint/no-explicit-any */
export class DynamicDialogConfig {
  public data?: any;

  public title?: string;

  public footer?: string;

  public width?: string;

  public height?: string;

  public closeOnEscape?: boolean;

  public baseZIndex?: number;

  public autoZIndex?: boolean;

  public style?: any;

  public dismissableMask?: any;

  public closable?: boolean;

  public modal?: boolean;

  public maskStyleClass?: string = '';

  public direction?: 'right' | 'left' = 'right';
}
