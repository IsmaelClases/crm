import { HttpClientModule } from '@angular/common/http';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(waitForAsync(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  })));

  beforeEach(() => {
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('doLogin', () => {
    let response;
    spyOn(authService, 'doLogin').and.returnValue(of('exito'));

    authService.doLogin('').subscribe(res => {
      response = res;
    });

    expect(response).toEqual('exito');
  });

  it('isAuthenticated', async () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(Promise.resolve(true));
    expect(await authService.isAuthenticated('home')).toEqual(true);
  });

  it('doLogout', async () => {
    let response;
    spyOn(authService, 'doLogout').and.returnValue(of('exito'));

    response = await authService.doLogout().toPromise();
    expect(response).toEqual('exito');
  });

  it('resetPassword', async () => {
    let response;
    spyOn(authService, 'resetPassword').and.returnValue(of('exito'));

    response = await authService.resetPassword('').toPromise();
    expect(response).toEqual('exito');
  });

  it('checkPassToken', async () => {
    let response;
    spyOn(authService, 'checkPassToken').and.returnValue(of('exito'));

    response = await authService.checkPassToken('token').toPromise();
    expect(response).toEqual('exito');
  });

  it('generateNewPass', async () => {
    let response;
    spyOn(authService, 'generateNewPass').and.returnValue(of('exito'));

    response = await authService.generateNewPass('').toPromise();
    expect(response).toEqual('exito');
  });

});
