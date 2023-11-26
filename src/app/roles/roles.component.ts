import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { RolesService } from '../services/roles.service';
import { MatTableDataSource } from '@angular/material/table';
import { AddRolComponent } from './add-rol/add-rol.component';
import { EditRolComponent } from './edit-rol/edit-rol.component';
import { DeleteRolComponent } from './delete-rol/delete-rol.component';
import { FormControl } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { Overlay } from '@angular/cdk/overlay';
import { Rol } from '../shared/interfaces/rol';
import { Permises } from '../shared/interfaces/api-response';


@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<Rol> = new MatTableDataSource();

  idFilter = new FormControl();
  rolFilter = new FormControl();
  permises: Permises;

  displayedColumns: string[];
  private filterValues = { id_rol: '', rol: '' };

  constructor(
              public dialog: MatDialog,
              private rolesService: RolesService,
              private overlay: Overlay
              ) { }

  ngOnInit() {
    this.getRoles();
  }

  async getRoles() {
    const RESPONSE = await this.rolesService.getAllRoles().toPromise();
    this.permises = RESPONSE.permises;
    if (RESPONSE.ok) {
      this.rolesService.roles = RESPONSE.data as Rol[];
      this.displayedColumns = ['id_rol', 'rol', 'actions'];
      this.dataSource.data = this.rolesService.roles;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();

      this.onChanges();
    }
  }

  async addRol() {
    const dialogRef = this.dialog.open(AddRolComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        // this.rolesService.roles.push(RESULT.data);
        // this.dataSource.data = this.rolesService.roles;
        this.ngOnInit();
      }
    }
  }

  async editRol(rol: Rol) {
    const dialogRef = this.dialog.open(EditRolComponent, { data: rol, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //console.log('edit');
        this.rolesService.roles = RESULT.data as Rol[];
        this.dataSource.data = this.rolesService.roles;

        this.rolesService.updateRol(RESULT.data);

        console.log(RESULT.data);
        console.log(this.dataSource.data);
        console.log(this.rolesService.roles);


        //this.dataSource.data = this.rolesService.roles;
        //this.ngOnInit();
      }
    }
  }

  async deleteRol(rol: Rol) {
    const dialogRef = this.dialog.open(DeleteRolComponent, { data: rol, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        // this.rolesService.removeRol(RESULT.data);
        // this.dataSource.data = this.rolesService.roles;
        this.ngOnInit();
      }
    }
  }

  createFilter(): (rol: Rol, filter: string) => boolean {
    const filterFunction = (rol: Rol, filter: string): boolean => {
        const searchTerms = JSON.parse(filter);

        return rol.id_rol.toString().indexOf(searchTerms.id_rol) !== -1
            && rol.rol.toLowerCase().indexOf(searchTerms.rol.toLowerCase()) !== -1;
    };

    return filterFunction;
  }

    onChanges() {
      this.idFilter.valueChanges
      .subscribe(value => {
          this.filterValues.id_rol = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      });
  
      this.rolFilter.valueChanges
      .subscribe(value => {
          this.filterValues.rol = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      }); 
    }

}
