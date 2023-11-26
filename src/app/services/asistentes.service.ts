import { Injectable } from '@angular/core';
import { Asistente } from '../shared/interfaces/asistente';
import { Reunion } from '../shared/interfaces/reunion';
import { ApiResponse } from '../shared/interfaces/api-response';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../shared/common.service';
import { URL_API } from 'src/environments/environment';

const ENDPOINT = 'asistente';

@Injectable({
  providedIn: 'root'
})
export class AsistentesService {

  asistente: Asistente[];

  constructor(private http: HttpClient, private commonService: CommonService) { }

  // get() {
  //   return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headers });
  // }

  // Asistentes de una reunion
//  getAllAsistentes({id_reunion}: Reunion) {
  getAllAsistentes(id_reunion: number) {
    const body = JSON.stringify(id_reunion);
    return this.http.put<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  addAsistente(asistente: Asistente) {
    const body = JSON.stringify(asistente);
    return this.http.post<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  // editAsistente(asistente: Asistente) {
  //   const body = JSON.stringify(asistente);
  //   return this.http.put<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  // }

  deleteAsistente(id: number|string) {
    return this.http.delete<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id=${id}`, {headers: this.commonService.headers });
  }
}
