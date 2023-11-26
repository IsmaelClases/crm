import { TestBed } from '@angular/core/testing';

import { ModosReunionService } from './modos-reunion.service';

describe('ModosReunionService', () => {
  let service: ModosReunionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModosReunionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
