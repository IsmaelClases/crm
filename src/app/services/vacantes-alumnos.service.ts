import { Injectable } from '@angular/core';
import { ApiResponse } from '../shared/interfaces/api-response';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../shared/common.service';
import { URL_API } from 'src/environments/environment';

import { VacantesAlumnos } from '../shared/interfaces/vacantes-alumnos';

const ENDPOINT = 'vacantes_alumnos';

@Injectable({
  providedIn: 'root'
})
export class VacantesAlumnosService {

  vacantesAlumnos: VacantesAlumnos[];
  constructor(
    private http: HttpClient,
    private commonService: CommonService
  ) { }

  getListado() {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headers });
  }

  getResumen() {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php?opcion=resumen`, { headers: this.commonService.headers });
  }

  addVacante(vacante: VacantesAlumnos) {
    const body = JSON.stringify(vacante);
    return this.http.post<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  editVacante(vacante: VacantesAlumnos) {
    const body = JSON.stringify(vacante);
    return this.http.put<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  deleteVacante(id_vacante: number|string) {
    return this.http.delete<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id_vacante=${id_vacante}`, {headers: this.commonService.headers });
  }

  getAlumnado(id_vacante:number, id_unidad_centro: number) {
    const body = JSON.stringify({
      id_vacante: id_vacante,
      id_unidad_centro: id_unidad_centro
    });
    /* Utilizar el parametro body para los datos de la consulta, ademas de mandar como get opcion (para aplicar filtro entre que funcion ejecutar)
    Para evitar el error (.get solo puede mandar 2 parametros por lo que la solución más sencilla es utilizar el post que no limita esta situación)*/
    return this.http.post<ApiResponse>(`${URL_API}/${ENDPOINT}.php?opcion=buscar`, body, { headers: this.commonService.headers });
  }

  addAlumnosSeleccionados(id_vacante: number, idAlumnos: number[]) {
    const body = JSON.stringify({ id_vacante: id_vacante, alumnosSeleccionados: idAlumnos });
    return this.http.post<ApiResponse>(`${URL_API}/${ENDPOINT}.php?opcion=alumnado`, body, { headers: this.commonService.headers });
  }
}
