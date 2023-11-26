import { trigger, sequence, state,stagger, animate, transition, style, query, animateChild } from '@angular/animations';


export const fadeOut =
  trigger('fadeOut', [
    state('void', style({ background: 'pink', borderBottomColor: 'pink', opacity: 0, transform: 'translateX(-550px)', 'box-shadow': 'none' })),
    transition('void => *', sequence([
      animate(".5s ease")
    ])),
    transition('* => void', [animate("5s ease")])
  ]);

export const rowsAnimation =
  trigger('rowsAnimation', [
    transition('void => *', [
      style({ height: '*', opacity: '0', transform: 'translateX(-550px)', 'box-shadow': 'none' }),
      sequence([
        animate(".35s ease", style({ height: '*', opacity: '.2', transform: 'translateX(0)', 'box-shadow': 'none' })),
        animate(".35s ease", style({ height: '*', opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]);



export const blub =
  trigger('blub', [
    transition(':leave', [
      style({ background: 'pink'}),
      query('*', stagger(-150, [animateChild()]), { optional: true })
    ]),
  ]);