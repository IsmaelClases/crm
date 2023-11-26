import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_API } from 'src/environments/environment';
import { CommonService } from '../shared/common.service';
import { Grupo } from '../shared/interfaces/grupo';
import { ApiResponse } from '../shared/interfaces/api-response';

const ENDPOINT = 'grupo';

@Injectable({
  providedIn: 'root'
})
export class GruposService {

  grupos: Grupo[];

  constructor(private http: HttpClient, private commonService: CommonService) { }

  getAllGrupos() {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headers } );
  }

  addGrupo(grupo: Grupo) {
    const body = JSON.stringify(grupo);
    return this.http.post<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  editGrupo(grupo: Grupo) {
    const body = JSON.stringify(grupo);
    return this.http.put<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  deleteGrupo(idGrupoMenu: number|string) {
    return this.http.delete<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id=${idGrupoMenu}`, { headers: this.commonService.headers });
  }

  removeGrupo(idGrupo) {
    this.grupos = this.grupos.filter(grupo => {
      return Number(grupo.id_grupo_menu) !== Number(idGrupo);
    });
  }

  updateGrupo(grupo: Grupo) {
    let index = null;
    this.grupos.filter((grupoFilter, indexFilter) => {
      if (grupo.id_grupo_menu === grupoFilter.id_grupo_menu) {
        index = indexFilter;
      }
    });

    if (index) {
      this.grupos[index] = grupo;
    }
  }
}
