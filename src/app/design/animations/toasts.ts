import { animate, query, style, transition, trigger } from '@angular/animations';

export const toastAnimation = [
  trigger('toastAnimation', [
    transition(':increment', [
      query('.toast-container', style({ transform: 'translateY(0)' })),
      query(
        '.toast-container',
        animate(
          '300ms cubic-bezier(.68,-.55,.265,1.55)',
          style({ transform: 'translateY(-100%)' }),
        ),
      ),
    ]),
    transition(':decrement', [
      query('.toast-container', style({ transform: 'translateY(0)' })),
      query(
        '.toast-container',
        animate(
          '300ms cubic-bezier(.68,-.55,.265,1.55)',
          style({ transform: 'translateY(-100%)' }),
        ),
      ),
    ]),
    transition(':enter', [
      query(
        '.toast-container',
        style({ transform: 'translateY(-65px)', opacity: 0 }),
      ),
      query(
        '.toast-container',
        animate(
          '300ms cubic-bezier(.68,-.55,.265,1.55)',
          style({ transform: 'translateY(0)', opacity: 1 }),
        ),
      ),
    ]),
    transition(':leave', [
      query(
        '.toast-container',
        style({ transform: 'translateY(0)', opacity: 1 }),
      ),
      query(
        '.toast-container',
        animate(
          '300ms cubic-bezier(.68,-.55,.265,1.55)',
          style({ transform: 'translateY(-65px)', opacity: 0 }),
        ),
      ),
    ]),
  ]),
];
