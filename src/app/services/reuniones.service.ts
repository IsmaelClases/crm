import { Injectable } from '@angular/core';
import { Reunion } from '../shared/interfaces/reunion';
import { ApiResponse } from '../shared/interfaces/api-response';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../shared/common.service';
import { URL_API } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';

const ENDPOINT = 'reunion';

@Injectable({
  providedIn: 'root'
})
export class ReunionesService {

  reuniones: Reunion[];
  reunion: Reunion;

  constructor(private http: HttpClient, private commonService: CommonService) { }

  setReunion(reunion: Reunion) {
    this.reunion = reunion;
  }

  setDatosBasicosReunion(formReunion: any) {
    this.reunion.id_reunion = formReunion.id_reunion;
    this.reunion.id_contacto = formReunion.id_contacto;
    this.reunion.reunion = formReunion.reunion;
    this.reunion.id_modo_reunion = formReunion.id_modo_reunion;
    this.reunion.id_motivo_reunion = formReunion.id_motivo_reunion;
    this.reunion.id_entidad_target = formReunion.id_entidad_target;
    this.reunion.id_zona = formReunion.id_zona;
    //this.reunion.objetivo = formReunion.objetivo;
    //this.reunion.resultado = formReunion.resultado;
    this.reunion.fecha = formReunion.fecha;
    this.reunion.hora_inicio = formReunion.hora_inicio;
    this.reunion.ubicacion = formReunion.ubicacion;
    this.reunion.localidad = formReunion.localidad;
    this.reunion.observaciones = formReunion.observaciones;
  }

  setObjetivoReunion(formReunion: any) {
    this.reunion.objetivo = formReunion.objetivo;
  }

  setResultadoReunion(formReunion: any) {
    this.reunion.resultado = formReunion.resultado;
  }

  getReunion(idReunion: number) {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id=${idReunion}`, { headers: this.commonService.headers });
  }

  getAllReuniones() {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headers });
  }

  addReunion(reunion: Reunion) {
    const body = JSON.stringify(reunion);
    return this.http.post<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  editReunion(reunion: Reunion) {
    const body = JSON.stringify(reunion);
    return this.http.put<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  deleteReunion(idReunion: number) {
    return this.http.delete<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id=${idReunion}`, {headers: this.commonService.headers });
  }

  getInforme(idReunion: number) {
    const ROUTE_INFORME = 'informe';

    let params = ``;
    params = `?route=${ROUTE_INFORME}&id=${idReunion}`;

    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php${params}`, { headers: this.commonService.headers });
  }
}
