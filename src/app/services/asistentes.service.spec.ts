import { TestBed } from '@angular/core/testing';

import { AsistentesService } from './asistentes.service';

describe('AsistentesService', () => {
  let service: AsistentesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsistentesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
