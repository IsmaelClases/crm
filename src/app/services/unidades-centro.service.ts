import { Injectable } from '@angular/core';
import { UnidadesCentro } from '../shared/interfaces/unidades-centro';
import { ApiResponse } from '../shared/interfaces/api-response';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../shared/common.service';
import { URL_API } from 'src/environments/environment';

const ENDPOINT = 'unidades_centro';

@Injectable({
  providedIn: 'root'
})
export class UnidadesCentroService {

  unidadesCentro: UnidadesCentro[];

  constructor(private http: HttpClient, private commonService: CommonService) { }

  // Obtener todas las unidades centro
  get() {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headers });
  }

  // Obtener unidades centro para una entidad específica
  getUnidadesCentro(idEntidad: number) {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php?entidad=${idEntidad}`, { headers: this.commonService.headers });
  }

  // Obtener todas las unidades centro (mismo que el método 'get')
  getAllUnidadesCentro() {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headers });
  }

  // Añadir una nueva unidad centro
  addUnidadesCentro(unidades: UnidadesCentro) {
    const body = JSON.stringify(unidades);
    return this.http.post<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  // Editar una unidad centro existente
  editUnidadesCentro(unidades: UnidadesCentro) {
    const body = JSON.stringify(unidades);
    return this.http.put<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  // Eliminar una unidad centro por su ID
  deleteUnidadesCentro(id: number|string) {
    return this.http.delete<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id=${id}`, {headers: this.commonService.headers });
  }
}
