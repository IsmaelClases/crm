import { Injectable } from '@angular/core';
import { TipoEntidad } from '../shared/interfaces/tipo-entidad';
import { ApiResponse } from '../shared/interfaces/api-response';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../shared/common.service';
import { URL_API } from 'src/environments/environment';

const ENDPOINT = 'tipo_entidad';

@Injectable({
  providedIn: 'root'
})
export class TiposEntidadService {

  tipoEntidad: TipoEntidad[];

  constructor(private http: HttpClient, private commonService: CommonService) { }

  get() {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headers });
  }

  getAllTiposEntidad() {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headers });
  }

  addTipoEntidad(tipoEntidad: TipoEntidad) {
    const body = JSON.stringify(tipoEntidad);
    return this.http.post<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  editTipoEntidad(tipoEntidad: TipoEntidad) {
    const body = JSON.stringify(tipoEntidad);
    return this.http.put<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  deleteTipoEntidad(id: number|string) {
    return this.http.delete<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id=${id}`, {headers: this.commonService.headers });
  }
}
