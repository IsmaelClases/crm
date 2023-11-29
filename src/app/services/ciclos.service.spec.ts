import { TestBed } from '@angular/core/testing';

import { CiclosService } from './ciclos.service';

describe('CiclosService', () => {
  let service: CiclosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CiclosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
