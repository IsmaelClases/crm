import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_API } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { CommonService } from '../shared/common.service';
import { Navegacion } from '../shared/interfaces/navegacion';
import { ApiResponse } from '../shared/interfaces/api-response';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  // headers: any;

  constructor(private http: HttpClient, private commonService: CommonService) {
    // console.log('tengo el token ' + this.cookieService.get('token'));
    // this.headers = new HttpHeaders({
    //   'Content-Type':  'application/json',
    //   'Authorization': `Bearer ${this.cookieService.get('token')}`
    // });
  }

  getMenu() {
    // const headers = this.commonService.headers;
    // const headers = new HttpHeaders({
    //   'Content-Type':  'application/json',
    //   'Authorization': `Bearer ${this.cookieService.get('token')}`
    // });
    return this.http.get<ApiResponse>(`${URL_API}/navegacion.php`, { headers: this.commonService.headers });
  }
}
