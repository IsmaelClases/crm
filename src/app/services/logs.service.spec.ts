import { HttpClientModule } from '@angular/common/http';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';

import { LogsService } from './logs.service';

describe('LogsService', () => {
  let logService: LogsService;

  beforeEach(waitForAsync(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  })));

  beforeEach(() => {
    logService = TestBed.inject(LogsService);
  });

  it('should be created', () => {
    expect(logService).toBeTruthy();
  });

  it('GetLogs', async () => {
    const logResponse = [
      {
        id_log: 'string',
        id_usuario: 'string',
        fecha: 'string',
        usuario: 'string',
        contenido: 'string',
        tipo_log: 'string'
    }
    ];
    let response;
    spyOn(logService, 'getAllLogs').and.returnValue(of(logResponse));

    response = await logService.getAllLogs().toPromise();

    expect(response).toEqual(logResponse);
  });
});
