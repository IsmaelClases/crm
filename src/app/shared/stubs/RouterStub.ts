import { NavigationStart } from '@angular/router';
import { of } from 'rxjs';

export class RouterStub {
    events = of(new NavigationStart(0, 'http://localhost:4200/'));
  }
