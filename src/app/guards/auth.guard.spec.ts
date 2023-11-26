import { HttpClientModule } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth.service';
import { AuthServiceStub } from '../shared/stubs/authServiceStub';

import { AuthGuardService } from './auth.guard';

describe('AuthGuard', () => {

  const mockSnapshot = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: AuthService,
          useClass: AuthServiceStub
        },
        {
          provide: RouterStateSnapshot,
          useValue: mockSnapshot
        }
      ]
    });
  });

  it('should create', inject([AuthGuardService], (guard: AuthGuardService) => {
    expect(guard).toBeTruthy();
  }));

  it('canActivate debe devolver una promesa', inject([AuthGuardService], async (guard: AuthGuardService) => {
    const test = guard.canActivate(
      new ActivatedRouteSnapshot(),
      TestBed.inject(RouterStateSnapshot)
    );
    await expectAsync(test).toBeResolved();
  }));
});
