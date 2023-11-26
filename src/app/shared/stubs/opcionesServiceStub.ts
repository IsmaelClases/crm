import { of } from 'rxjs';

export class OpcionesServiceStub {
    getAllOpciones() {
    return of([
        {
            id_opcion_menu: 1,
            opcion: 'string',
            accion: 'string',
            texto_tooltip: 'string',
            observaciones: 'string'
        }]);
  }

  addOpcion() {
    return of('exito');
  }

  editOpcion() {
    return of('exito');
  }

  deleteOpcion() {
    return of('exito');
  }

  getOpcion() {
    return {
      id_opcion_menu: 1,
      opcion: 'string',
      accion: 'string',
      texto_tooltip: 'string',
      observaciones: 'string'
    };
  }
}
