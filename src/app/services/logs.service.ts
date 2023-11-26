import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API } from 'src/environments/environment';
import { CommonService } from '../shared/common.service';
import { Log } from '../shared/interfaces/log';
import { ApiResponse } from '../shared/interfaces/api-response';

const ENDPOINT = 'log';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  // headers: any;

  constructor(private http: HttpClient, private commonService: CommonService) {
  //   this.headers = new HttpHeaders({
  //     'Content-Type':  'application/json',
  //     'Authorization': `Bearer ${this.cookieService.get('token')}`
  //   });
  }

  getAllLogs() {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headers } );
  }

}
