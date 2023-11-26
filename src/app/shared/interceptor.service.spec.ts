import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AuthInterceptor } from './interceptor.service';

describe('InterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(service).toBeTruthy();
  });
});
