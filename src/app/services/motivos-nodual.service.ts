import { Injectable } from '@angular/core';
import { MotivoNodual } from '../shared/interfaces/motivo-nodual';
import { ApiResponse } from '../shared/interfaces/api-response';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../shared/common.service';
import { URL_API } from 'src/environments/environment';

const ENDPOINT = 'motivo_nodual';


@Injectable({
  providedIn: 'root'
})
export class MotivosNodualService {

  motivoNodual: MotivoNodual[];

  constructor(private http: HttpClient, private commonService: CommonService) { }

  get(idEntidad: number) {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php?entidad=${idEntidad}`, { headers: this.commonService.headers });
  }

  getAllMotivosNodual() {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headers });
  }

  addMotivoNodual(motivoNodual: MotivoNodual) {
    const body = JSON.stringify(motivoNodual);
    return this.http.post<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  editMotivoNodual(motivoNodual: MotivoNodual) {
    const body = JSON.stringify(motivoNodual);
    return this.http.put<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  deleteMotivoNodual(id: number|string) {
    return this.http.delete<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id=${id}`, {headers: this.commonService.headers });
  }
}
