import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

export const fadeInAnimation = trigger('fadeInAnimation', [
  transition('* <=> *', [
    // route 'enter' transition
    query(':enter', [
      style({ opacity: 0 }),
      animate('.3s', style({ opacity: 1 }))
    ], { optional: true })
  ])
]);

export const fadeAnimation = trigger(
  'fade', [
    transition(':enter', [
      query('div',  [
        style({ opacity: 0 }),
        stagger(0,
          animate('300ms', style({ opacity: 1 }))
        )
      ], {optional: true})
    ]),
    transition(':leave', [
      query('div', [
        style({ opacity: 1 }),
        stagger(0,
          animate('300ms', style({ opacity: 0 }))
        )
      ], {optional: true})
    ])
  ]
);
