import { of } from 'rxjs';

export class MenuServiceStub {
    getMenu() {
    return of([
        {
            id_opcion_menu: 0,
            opcion: 'string',
            accion: 'string',
            texto_tooltip: 'string',
            observaciones: 'string',
          }]);
  }
}
