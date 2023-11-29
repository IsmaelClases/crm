import { TestBed } from '@angular/core/testing';

import { UnidadesDualService } from './unidades-dual.service';

describe('UnidadesDualService', () => {
  let service: UnidadesDualService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnidadesDualService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
