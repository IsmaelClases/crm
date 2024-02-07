import { TestBed } from '@angular/core/testing';

import { VacantesAlumnosService } from './vacantes-alumnos.service';

describe('VacantesAlumnosService', () => {
  let service: VacantesAlumnosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacantesAlumnosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
