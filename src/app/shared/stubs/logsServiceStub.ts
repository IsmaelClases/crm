import { of } from 'rxjs';

export class LogsServiceStub {
    getAllLogs() {
    return of([
        {
            id_log: 'string',
            id_usuario: 'string',
            fecha: 'string',
            usuario: 'string',
            contenido: 'string',
            tipo_log: 'string'
        }]);
  }
}
