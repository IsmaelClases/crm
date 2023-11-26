import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { URL_API } from 'src/environments/environment';
import { CommonService } from '../shared/common.service';
import { RolMenu } from '../shared/interfaces/rol-menu';
import { ApiResponse } from '../shared/interfaces/api-response';

const ENDPOINT = 'rol_menu';

@Injectable({
  providedIn: 'root'
})
export class RolMenuService {

  rolesMenu: RolMenu[];

  constructor(private http: HttpClient, private commonService: CommonService) {
  }

  getAllRolesMenu() {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, { headers: this.commonService.headers });
  }

  addRolMenu(rolMenu: RolMenu) {
    const body = JSON.stringify(rolMenu);
    return this.http.post<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }


  editRolMenu(rolMenu: RolMenu) {
    const body = JSON.stringify(rolMenu);
    return this.http.put<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  deleteRolMenu(idRolMenu: string | number) {
    return this.http.delete<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id=${idRolMenu}`, { headers: this.commonService.headers });
  }

  removeRolMenu(idRolMenu) {
    this.rolesMenu = this.rolesMenu.filter(rolMenu => {
      return Number(rolMenu.id_rol_menu) !== Number(idRolMenu);
    });
  }

  updateRolMenu(rolMenu: RolMenu) {
    let index = null;
    this.rolesMenu.filter((rolMenuFilter, indexFilter) => {
      if (rolMenu.id_rol_menu === rolMenuFilter.id_rol_menu) {
        index = indexFilter;
      }
    });

    if (index) {
      this.rolesMenu[index] = rolMenu;
    }
  }
}
