import { Component, OnInit, ViewChild } from '@angular/core';
import { AddGrupoComponent } from './add-grupo/add-grupo.component';
import { EditGrupoComponent } from './edit-grupo/edit-grupo.component';
import { DeleteGrupoComponent } from './delete-grupo/delete-grupo.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GruposService } from '../services/grupos.service';
import { FormControl } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { Overlay } from '@angular/cdk/overlay';
import { Grupo } from '../shared/interfaces/grupo';
import { Permises } from '../shared/interfaces/api-response';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss']
})
export class GruposComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<Grupo> = new MatTableDataSource();

  idFilter = new FormControl();
  grupoFilter = new FormControl();
  ordenFilter = new FormControl();

  permises: Permises;

  displayedColumns: string[];
  private filterValues = { id_grupo_menu: '', grupo: '', orden: '' };

  constructor(
              public dialog: MatDialog,
              private gruposService: GruposService,
              private overlay: Overlay
              ) { }

  ngOnInit() {
    this.getGrupos();
  }

  async getGrupos() {
    const RESPONSE = await this.gruposService.getAllGrupos().toPromise();
    this.permises = RESPONSE.permises;

    if (RESPONSE.ok) {
      this.gruposService.grupos = RESPONSE.data as Grupo[];
      this.displayedColumns = ['id_grupo_menu', 'grupo', 'orden', 'actions'];
      this.dataSource.data = this.gruposService.grupos;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();
      this.onChanges();
    }
  }

  async addGrupo() {
    const dialogRef = this.dialog.open(AddGrupoComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        // this.gruposService.grupos.push(RESULT.data);
        // this.dataSource.data = this.gruposService.grupos;
        this.ngOnInit();
      }
    }
  }

  async editGrupo(grupo: Grupo) {
    const dialogRef = this.dialog.open(EditGrupoComponent, { data: grupo, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await  dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        // this.gruposService.updateGrupo(RESULT.data);
        // this.dataSource.data = this.gruposService.grupos;
        this.ngOnInit();
      }
    }
  }

  async deleteGrupo(grupo: Grupo) {
    const dialogRef = this.dialog.open(DeleteGrupoComponent, { data: grupo, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        // this.gruposService.removeGrupo(RESULT.data);
        // this.dataSource.data = this.gruposService.grupos;
        this.ngOnInit();
      }
    }
  }

  createFilter(): (grupo: Grupo, filter: string) => boolean {
    const filterFunction = (grupo: Grupo, filter: string): boolean => {
        const searchTerms = JSON.parse(filter);

        return grupo.id_grupo_menu.toString().indexOf(searchTerms.id_grupo_menu) !== -1
            && grupo.grupo.toLowerCase().indexOf(searchTerms.grupo.toLowerCase()) !== -1;
    };
    return filterFunction;
  }

  onChanges() {
    this.idFilter.valueChanges
    .subscribe(value => {
        this.filterValues.id_grupo_menu = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.grupoFilter.valueChanges
    .subscribe(value => {
        this.filterValues.grupo = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });  

    this.ordenFilter.valueChanges
    .subscribe(value => {
        this.filterValues.orden = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });  
  }
}
