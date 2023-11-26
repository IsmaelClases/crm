import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_API } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { CommonService } from '../shared/common.service';
import { Opcion } from '../shared/interfaces/opcion';
import { Observable } from 'rxjs';
import { ApiResponse } from '../shared/interfaces/api-response';

const ENDPOINT = 'opcion';

@Injectable({
  providedIn: 'root'
})
export class OpcionesService {

  opciones: Opcion[];

  constructor(private http: HttpClient, private commonService: CommonService) {
  }

  getAllOpciones(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headers });
  }

  addOpcion(opcion: Opcion) {
    const body = JSON.stringify(opcion);
    return this.http.post<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers, });
  }

  editOpcion(opcion: Opcion) {
    const body = JSON.stringify(opcion);
    return this.http.put<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers, });
  }

  deleteOpcion(idOpcionMenu: string|number) {
    return this.http.delete<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id=${idOpcionMenu}`, { headers: this.commonService.headers, });
  }

  removeOpcion(idOpcion) {
    this.opciones = this.opciones.filter(opcion => {
      return Number(opcion.id_opcion_menu) !== Number(idOpcion);
    });
  }

  updateOpcion(opcion: Opcion) {
    let index = null;
    this.opciones.filter((opcionFilter, indexFilter) => {
      if (opcion.id_opcion_menu === opcionFilter.id_opcion_menu) {
        index = indexFilter;
      }
    });

    if (index) {
      this.opciones[index] = opcion;
    }
  }
}
