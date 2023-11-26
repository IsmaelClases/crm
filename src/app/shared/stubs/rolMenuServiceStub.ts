import { Observable, of } from 'rxjs';
import { RolMenu } from '../interfaces/rol-menu';

export class RolesMenuServiceStub {
    getAllRolesMenu(): Observable<RolMenu[]> {
    return of([
        {
            id_rol_menu: 'string',
            id_opcion_menu: 'string',
            id_grupo_menu: 'string',
            id_rol: 'string',
            observaciones: 'string',
            opcion: 'string',
            accion: 'string',
            texto_tooltip: 'string',
            grupo: 'string',
            rol: 'string',
            orden: 'string'
        }]);
  }

  addRolMenu() {
    return of('exito');
  }

  editRolMenu() {
    return of('exito');
  }

  deleteRolMenu() {
    return of('exito');
  }

  getRolMenu(): RolMenu {
    return  {
      id_rol_menu: 'string',
      id_opcion_menu: 'string',
      id_grupo_menu: 'string',
      id_rol: 'string',
      observaciones: 'string',
      opcion: 'string',
      accion: 'string',
      texto_tooltip: 'string',
      grupo: 'string',
      rol: 'string',
      orden: 'string'
    };
  }
}
