import { Injectable } from '@angular/core';
import { Entidad } from '../shared/interfaces/entidad';
import { ApiResponse } from '../shared/interfaces/api-response';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../shared/common.service';
import { URL_API } from 'src/environments/environment';

const ENDPOINT = 'entidad';

@Injectable({
  providedIn: 'root'
})
export class EntidadesService {

  entidades: Entidad[];
  entidad: Entidad;

  constructor(private http: HttpClient, private commonService: CommonService) { }

  setEntidad(entidad: Entidad) {
    this.entidad = entidad;
  }

  setDatosBasicosEntidad(formEntidad: any) {
    this.entidad.id_entidad = formEntidad.id_entidad;
    this.entidad.entidad = formEntidad.entidad;
    this.entidad.id_zona = formEntidad.id_zona;
    this.entidad.id_contacto = formEntidad.id_contacto;
    this.entidad.id_tipo_entidad = formEntidad.id_tipo_entidad;
    this.entidad.direccion = formEntidad.direccion;
    this.entidad.cp = formEntidad.cp;
    this.entidad.localidad = formEntidad.localidad;
    this.entidad.id_provincia = formEntidad.id_provincia;
    this.entidad.telefono = formEntidad.telefono;
    this.entidad.email = formEntidad.email;
    this.entidad.web = formEntidad.web;
    this.entidad.codigo = formEntidad.codigo;
    this.entidad.observaciones = formEntidad.observaciones;
  }

  get() {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headers });
  }

  getAllEntidades() {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headers });
  }

  getContactos(idEntidades: string[]) {
    const ROUTE = 'obtener_contactos';
    const ID_ENTIDADES = JSON.stringify(idEntidades);
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id=${ID_ENTIDADES}&route=${ROUTE}`, { headers: this.commonService.headers });
  }

  addEntidad(entidad: Entidad) {
    const body = JSON.stringify(entidad);
    return this.http.post<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  editEntidad(entidad: Entidad) {
    const body = JSON.stringify(entidad);
    return this.http.put<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  deleteEntidad(id: number|string) {
    return this.http.delete<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id=${id}`, {headers: this.commonService.headers });
  }


}
