import { of } from 'rxjs';

export class GruposServiceStub {
    getAllGrupos() {
    return of([
        {
            id_grupo_menu: 1,
            grupo: 'string',
            orden: 1,
            observaciones: 'string'
        }]);
  }

  addGrupo() {
    return of('exito');
  }

  editGrupo() {
    return of('exito');
  }

  deleteGrupo() {
    return of('exito');
  }
  getGrupo() {
    return {
      id_grupo_menu: 1,
      grupo: 'string',
      orden: 1,
      observaciones: 'string'
    };
  }
}
