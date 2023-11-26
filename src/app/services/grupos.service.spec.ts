import { HttpClientModule } from '@angular/common/http';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';

import { GruposService } from './grupos.service';

describe('GruposService', () => {
  let gruposService: GruposService;

  beforeEach(waitForAsync(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  })));

  beforeEach(() => {
    gruposService = TestBed.inject(GruposService);
  });

  it('should be created', () => {
    expect(gruposService).toBeTruthy();
  });

  it('GetGrupos', async () => {
    const grupoResponse = [
      {
        id_grupo_menu: 1,
        grupo: 'string',
        orden: 1,
        observaciones: 'string'
    }
    ];
    let response;
    spyOn(gruposService, 'getAllGrupos').and.returnValue(of(grupoResponse));

    response = await gruposService.getAllGrupos().toPromise();

    expect(response).toEqual(grupoResponse);
  });



  it('AddGrupo', async () => {
    const grupo =
      {
        grupo: 'string',
        orden: 1,
        observaciones: 'string'
    };
    let response;
    spyOn(gruposService, 'addGrupo').and.returnValue(of('exito'));

    response = await gruposService.addGrupo(grupo).toPromise();

    expect(response).toEqual('exito');
  });



  it('EditGrupo', async () => {
    const grupo =
      {
        id_grupo_menu: 1,
        grupo: 'string',
        orden: 1,
        observaciones: 'string'
    };
    let response;
    spyOn(gruposService, 'editGrupo').and.returnValue(of('exito'));

    response = await gruposService.editGrupo(grupo).toPromise();

    expect(response).toEqual('exito');
  });


  it('DeleteGrupo', async () => {
    const idGrupoMenu = 1;
    let response;
    spyOn(gruposService, 'deleteGrupo').and.returnValue(of('exito'));

    response = await gruposService.deleteGrupo(idGrupoMenu).toPromise();

    expect(response).toEqual('exito');
  });
});
