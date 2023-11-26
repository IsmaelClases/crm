import { of } from 'rxjs';

export class RolesServiceStub {
  getAllRoles() {
    return of([
        {
          id_rol: 1,
          rol: 'test',
          observaciones: null,
      },
      {
        id_rol: 2,
        rol: 'test',
        observaciones: null,
    }]);
  }

  addRol() {
    return of('exito');
  }

  editRol() {
    return of('exito');
  }

  deleteRol() {
    return of('exito');
  }

  getRol() {
    return {
      id_rol: 1,
      rol: 'test',
      observaciones: null,
    };
  }

//   getUserDetails() {
//     return of({
//       data: {
//         id: 1,
//         first_name: 'George',
//         last_name: 'Bluth',
//         avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg',
//       },
//     });
//   }
}
