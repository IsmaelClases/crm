import { HttpClientModule } from '@angular/common/http';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs'; // Add import

import { UsuarioService } from './usuario.service';

describe('UsuarioService', () => {
  let usuarioService: UsuarioService;
  beforeEach(waitForAsync(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
  })));

  beforeEach(() => {
    usuarioService = TestBed.inject(UsuarioService);
  });


  it('should be created', () => {
    expect(usuarioService).toBeTruthy();
  });


  it('GetUsers', () => {
    const userResponse = [
      {
        id_usuario: 'test',
        usuario: 'test',
        id_rol: 'test',
        rol: 'test',
        observaciones: null,
        nombre_publico: 'test',
        habilitado: 'test'
    }
    ];
    let response;
    spyOn(usuarioService, 'getAllUsuarios').and.returnValue(of(userResponse));

    usuarioService.getAllUsuarios().subscribe(res => {
      response = res;
    });

    expect(response).toEqual(userResponse);
  });



  it('AddUser', () => {
    const user =
      {
        // id_usuario: 'test',
        usuario: 'test',
        id_rol: 'test',
        rol: 'test',
        observaciones: null,
        nombre_publico: 'test',
        habilitado: 'test'
    };
    let response;
    spyOn(usuarioService, 'addUsuario').and.returnValue(of('exito'));

    usuarioService.addUsuario(user).subscribe(res => {
      response = res;
    });

    expect(response).toEqual('exito');
  });



  it('EditUser', () => {
    const user =
      {
        id_usuario: 'test',
        usuario: 'test',
        id_rol: 'test',
        rol: 'test',
        observaciones: null,
        nombre_publico: 'test',
        habilitado: 'test'
    };
    let response;
    spyOn(usuarioService, 'editUsuario').and.returnValue(of('exito'));

    usuarioService.editUsuario(user).subscribe(res => {
      response = res;
    });

    expect(response).toEqual('exito');
  });


  // describe('deleteUsuario', () => {
  it('DeleteUser', () => {
    const user =
      {
        id_usuario: 'test',
        usuario: 'test',
        id_rol: 'test',
        rol: 'test',
        observaciones: null,
        nombre_publico: 'test',
        habilitado: 'test'
    };
    let response;
    spyOn(usuarioService, 'deleteUsuario').and.returnValue(of('exito'));

    usuarioService.deleteUsuario(user).subscribe(res => {
      response = res;
    });

    expect(response).toEqual('exito');
  });
  // });
});
