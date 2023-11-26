import { Injectable } from '@angular/core';
import { MotivoReunion } from '../shared/interfaces/motivo-reunion';
import { ApiResponse } from '../shared/interfaces/api-response';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../shared/common.service';
import { URL_API } from 'src/environments/environment';

const ENDPOINT = 'motivo_reunion';


@Injectable({
  providedIn: 'root'
})
export class MotivosReunionService {

  motivoReunion: MotivoReunion[];

  constructor(private http: HttpClient, private commonService: CommonService) { }

  get() {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headers });
  }

  getAllMotivosReunion() {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headers });
  }

  addMotivoReunion(motivoReunion: MotivoReunion) {
    const body = JSON.stringify(motivoReunion);
    return this.http.post<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  editMotivoReunion(motivoReunion: MotivoReunion) {
    const body = JSON.stringify(motivoReunion);
    return this.http.put<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  deleteMotivoReunion(id: number|string) {
    return this.http.delete<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id=${id}`, {headers: this.commonService.headers });
  }
}
