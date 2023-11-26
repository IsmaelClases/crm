import { Injectable } from '@angular/core';
import { Contacto } from '../shared/interfaces/contacto';
import { ApiResponse } from '../shared/interfaces/api-response';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../shared/common.service';
import { URL_API } from 'src/environments/environment';
import { Reunion } from '../shared/interfaces/reunion';
import { Entidad } from '../shared/interfaces/entidad';

const ENDPOINT = 'contacto';

@Injectable({
  providedIn: 'root'
})
export class ContactosService {

  contacto: Contacto[];

  constructor(private http: HttpClient, private commonService: CommonService) { }
/*
  get() {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headers });
  }
*/
  getContactosEntidad(idEntidad: number) {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php?entidad=${idEntidad}`, { headers: this.commonService.headers });
  }

  getAllContactos() {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headers });
  }
  
  // Se trae todos los contactos que no están ya en la reunión como asistentes
  getContactosDisponibles(idReunion: number) {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php?reunion=${idReunion}`, { headers: this.commonService.headers });
  }

  // Marcada la Entidad de la DG a fuego como entidad=1
  getAllDinamizadores() {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php?entidad=1`, { headers: this.commonService.headers });
  }

  addContacto(contacto: Contacto) {
    const body = JSON.stringify(contacto);
    return this.http.post<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  editContacto(contacto: Contacto) {
    const body = JSON.stringify(contacto);
    return this.http.put<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  deleteContacto(id: number|string) {
    return this.http.delete<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id=${id}`, {headers: this.commonService.headers });
  }
}
