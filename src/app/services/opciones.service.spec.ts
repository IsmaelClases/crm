import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { OpcionesService } from './opciones.service';

describe('OpcionesService', () => {

  let opcionesService: OpcionesService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  beforeEach(() => {
    opcionesService = TestBed.inject(OpcionesService);
  });

  it('should be created', () => {
    expect(opcionesService).toBeTruthy();
  });

  it('GetOptions', () => {
    const optionResponse = [
      {
        id_opcion_menu: 1,
        opcion: 'string',
        accion: 'string',
        texto_tooltip: 'string',
        observaciones: 'string'
    }
    ];
    let response;
    spyOn(opcionesService, 'getAllOpciones').and.returnValue(of(optionResponse));

    opcionesService.getAllOpciones().subscribe(res => {
      response = res;
    });

    expect(response).toEqual(optionResponse);
  });



  it('AddOptions', () => {
    const option =
      {
        opcion: 'string',
        accion: 'string',
        texto_tooltip: 'string',
        observaciones: 'string'
    };
    let response;
    spyOn(opcionesService, 'addOpcion').and.returnValue(of('exito'));

    opcionesService.addOpcion(option).subscribe(res => {
      response = res;
    });

    expect(response).toEqual('exito');
  });



  it('EditOption', () => {
    const option =
      {
        id_opcion_menu: 1,
        opcion: 'string',
        accion: 'string',
        texto_tooltip: 'string',
        observaciones: 'string'
    };
    let response;
    spyOn(opcionesService, 'editOpcion').and.returnValue(of('exito'));

    opcionesService.editOpcion(option).subscribe(res => {
      response = res;
    });

    expect(response).toEqual('exito');
  });


  // describe('deleteUsuario', () => {
  it('DeleteOption', () => {
    const idOption = 1;
    let response;
    spyOn(opcionesService, 'deleteOpcion').and.returnValue(of('exito'));

    opcionesService.deleteOpcion(idOption).subscribe(res => {
      response = res;
    });

    expect(response).toEqual('exito');
  });
  // });
});
