import { TestBed } from '@angular/core/testing';

import { TiposEntidadService } from './tipos-entidad.service';

describe('TiposEntidadService', () => {
  let service: TiposEntidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposEntidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
