import { HttpClientModule } from '@angular/common/http';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';

import { MenuService } from './menu.service';

describe('MenuService', () => {
  let menuService: MenuService;

  beforeEach(waitForAsync(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  })));

  beforeEach(() => {
    menuService = TestBed.inject(MenuService);
  });

  it('should be created', () => {
    expect(menuService).toBeTruthy();
  });

  it('GetMenu', () => {
    const menuResponse = [
      {
        grupo: 'string',
        opciones: [
          {
            id_opcion_menu: 0,
            opcion: 'string',
            accion: 'string',
            texto_tooltip: 'string',
            observaciones: 'string',
          }
        ]
    }
    ];
    let response;
    spyOn(menuService, 'getMenu').and.returnValue(of(menuResponse));

    menuService.getMenu().subscribe(res => {
      response = res;
    });

    expect(response).toEqual(menuResponse);
  });
});
