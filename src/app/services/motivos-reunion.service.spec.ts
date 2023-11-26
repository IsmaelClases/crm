import { TestBed } from '@angular/core/testing';

import { MotivosReunionService } from './motivos-reunion.service';

describe('MotivosReunionService', () => {
  let service: MotivosReunionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MotivosReunionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
