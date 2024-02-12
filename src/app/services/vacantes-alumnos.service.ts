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
  constructor(private http: HttpClient, private commonService: CommonService) { }

  getListado() {
    //return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headers });

    return {
      "ok": true,
      "message": null,
      "data": [
          {
              "unidad_centro": "dam1",
              "plazas_ocupadas": "7",
              "plazas_totales": "23",
          },
          {
            "unidad_centro": "dam2",
            "plazas_ocupadas": "7",
            "plazas_totales": "34",
        }
      ],
      "permises": null
  }
  }
}
