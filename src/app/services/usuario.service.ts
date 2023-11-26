import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_API, URL_BASE } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { CommonService } from '../shared/common.service';
import { Usuario } from '../shared/interfaces/usuario';
import { ApiResponse } from '../shared/interfaces/api-response';

const ENDPOINT = 'usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarios: Usuario[];

  constructor(private http: HttpClient, private commonService: CommonService) {
  }

  getAllUsuarios() {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headers });
  }

  addUsuario(usuario: Usuario) {
    const body = JSON.stringify(usuario);
    return this.http.post<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, {headers: this.commonService.headers });
  }

  editUsuario(usuario: Usuario, route?: string) {
    const body = JSON.stringify(usuario);

    if (route) {
      route = `?route=${route}`;
    } else {
      route = '';
    }

    return this.http.put<ApiResponse>(`${URL_API}/${ENDPOINT}.php${route}`, body, { headers: this.commonService.headers });
  }

  deleteUsuario(usuario: Usuario) {
    return this.http.delete<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id=${usuario.id_usuario}`, { headers: this.commonService.headers });
  }

  removeUsuario(idUser) {
    this.usuarios = this.usuarios.filter(usuario => {
      return Number(usuario.id_usuario) !== Number(idUser);
    });
  }

  updateUsuario(usuario: Usuario) {
    let index = null;
    this.usuarios.filter((usuarioFilter, indexFilter) => {
      if (usuario.id_usuario === usuarioFilter.id_usuario) {
        index = indexFilter;
      }
    });

    if (index) {
      this.usuarios[index] = usuario;
    }
  }

}
