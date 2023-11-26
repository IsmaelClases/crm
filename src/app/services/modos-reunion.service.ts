import { Injectable } from '@angular/core';
import { ModoReunion } from '../shared/interfaces/modo-reunion';
import { ApiResponse } from '../shared/interfaces/api-response';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../shared/common.service';
import { URL_API } from 'src/environments/environment';

const ENDPOINT = 'modo_reunion';

@Injectable({
  providedIn: 'root'
})
export class ModosReunionService {

  modoReunion: ModoReunion[];

  constructor(private http: HttpClient, private commonService: CommonService) { }

  get() {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headers });
  }

  getAllModosReunion() {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headers });
  }

  addModoReunion(modoReunion: ModoReunion) {
    const body = JSON.stringify(modoReunion);
    return this.http.post<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  editModoReunion(modoReunion: ModoReunion) {
    const body = JSON.stringify(modoReunion);
    return this.http.put<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  deleteModoReunion(id: number|string) {
    return this.http.delete<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id=${id}`, {headers: this.commonService.headers });
  }
}
