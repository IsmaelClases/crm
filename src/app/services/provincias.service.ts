import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from 'src/environments/environment';
import { CommonService } from '../shared/common.service';
import { ApiResponse } from '../shared/interfaces/api-response';
import { Provincia } from '../shared/interfaces/provincia';

const ENDPOINT = 'provincia';

@Injectable({
  providedIn: 'root'
})
export class ProvinciasService {

  provincia: Provincia[];

  constructor(private http: HttpClient, private commonService: CommonService) { }

  get() {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headers });
  }

  getAllProvincias() {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headers });
  }
}
