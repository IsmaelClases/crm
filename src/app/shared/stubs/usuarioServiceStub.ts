import { Observable, of } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

export class UsuarioServiceStub {
    getAllUsuarios(): Observable<Usuario[]> {
    return of([
        {
          id_usuario: 'test',
          usuario: 'test',
          id_rol: 'test',
          rol: 'test',
          observaciones: null,
          nombre_publico: 'test',
          habilitado: 'test'
      }]);
  }

  addUsuario() {
    return of('exito');
  }

  editUsuario() {
    return of('exito');
  }

  deleteUsuario() {
    return of('exito');
  }

  getUsuario(): Usuario {
    return {
      id_usuario: 'test',
      usuario: 'test',
      id_rol: 'test',
      rol: 'test',
      observaciones: null,
      nombre_publico: 'test',
      habilitado: 'test'
    };
  }
}
