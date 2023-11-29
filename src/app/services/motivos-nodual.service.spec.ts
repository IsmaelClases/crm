import { TestBed } from '@angular/core/testing';

import { MotivosNodualService } from './motivos-nodual.service';

describe('MotivosNodualService', () => {
  let service: MotivosNodualService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MotivosNodualService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
