import { Component, OnInit, ViewChild } from '@angular/core';
import { RolMenuService } from '../services/rol-menu.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddRolMenuComponent } from './add-rol-menu/add-rol-menu.component';
import { EditRolMenuComponent } from './edit-rol-menu/edit-rol-menu.component';
import { DeleteRolMenuComponent } from './delete-rol-menu/delete-rol-menu.component';
import { FormControl } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { Overlay } from '@angular/cdk/overlay';
import { RolMenu } from '../shared/interfaces/rol-menu';
import { Permises } from '../shared/interfaces/api-response';

@Component({
  selector: 'app-roles-menu',
  templateUrl: './roles-menu.component.html',
  styleUrls: ['./roles-menu.component.scss']
})
export class RolesMenuComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  rolesMenu: RolMenu;
  dataSource: MatTableDataSource<RolMenu> = new MatTableDataSource();

  rolFilter = new FormControl();
  grupoFilter = new FormControl();
  opcionFilter = new FormControl();

  permises: Permises;

  displayedColumns: string[];
  private filterValues = { rol: '', grupo: '', opcion: '' };

  constructor(
              public dialog: MatDialog,
              private rolesMenuService: RolMenuService,
              private overlay: Overlay
              ) { }

  ngOnInit() {
    this.getRoles();
  }

  async getRoles() {
    const RESPONSE = await this.rolesMenuService.getAllRolesMenu().toPromise();
    this.permises = RESPONSE.permises;
    if (RESPONSE.ok) {
      this.rolesMenuService.rolesMenu = RESPONSE.data as RolMenu[];
      this.displayedColumns = ['rol', 'grupo', 'opcion', 'actions'];
      this.dataSource.data = this.rolesMenuService.rolesMenu;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();

      this.onChanges();
    }
  }

  async addRolMenu() {
    const dialogRef = this.dialog.open(AddRolMenuComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        this.rolesMenuService.rolesMenu.push(RESULT.data);
        this.dataSource.data = this.rolesMenuService.rolesMenu;
      }
    }
  }

  async editRolMenu(rolMenu: RolMenu) {
    const dialogRef = this.dialog.open(EditRolMenuComponent, { data: rolMenu, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        this.rolesMenuService.updateRolMenu(RESULT.data);
        this.dataSource.data = this.rolesMenuService.rolesMenu;
      }
    }
  }

  async deleteRolMenu(rolMenu: RolMenu) {
    const dialogRef = this.dialog.open(DeleteRolMenuComponent, { data: rolMenu, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        this.rolesMenuService.removeRolMenu(RESULT.data);
        this.dataSource.data = this.rolesMenuService.rolesMenu;
      }
    }
  }

  createFilter(): (rol: RolMenu, filter: string) => boolean {
    const filterFunction = (rol: RolMenu, filter: string): boolean => {
        const searchTerms = JSON.parse(filter);

        return rol.rol.toLowerCase().indexOf(searchTerms.rol.toLowerCase()) !== -1
            && rol.grupo.toLowerCase().indexOf(searchTerms.grupo.toLowerCase()) !== -1
            && rol.opcion.toLowerCase().indexOf(searchTerms.opcion.toLowerCase()) !== -1;
    };

    return filterFunction;
  }

  onChanges() {
    this.rolFilter.valueChanges
    .subscribe(value => {
        this.filterValues.rol = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.grupoFilter.valueChanges
    .subscribe(value => {
        this.filterValues.grupo = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    }); 

    this.opcionFilter.valueChanges
    .subscribe(value => {
        this.filterValues.opcion = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    }); 

  }
}
