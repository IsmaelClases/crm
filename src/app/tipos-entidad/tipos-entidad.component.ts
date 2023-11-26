import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { FormControl } from '@angular/forms';
import { Permises } from '../shared/interfaces/api-response';
import { combineLatest } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { TipoEntidad } from '../shared/interfaces/tipo-entidad';
import { TiposEntidadService } from '../services/tipos-entidad.service';

import { AddTipoEntidadComponent } from './add-tipo-entidad/add-tipo-entidad.component';
import { EditTipoEntidadComponent } from './edit-tipo-entidad/edit-tipo-entidad.component';
import { DeleteTipoEntidadComponent } from './delete-tipo-entidad/delete-tipo-entidad.component';

@Component({
  selector: 'app-tipos-entidad',
  templateUrl: './tipos-entidad.component.html',
  styleUrls: ['./tipos-entidad.component.scss']
})
export class TiposEntidadComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<TipoEntidad> = new MatTableDataSource();

  idTipoEntidadFilter = new FormControl();
  tipoEntidadFilter = new FormControl();

  permises: Permises;

  displayedColumns: string[];
  private filterValues = { id_tipo_entidad: '', tipo_entidad: '' };

  constructor(
    public dialog: MatDialog,
    private tiposEntidadService: TiposEntidadService,
    private overlay: Overlay
  ) { }

  ngOnInit(): void {
    this.getTiposEntidad();
    //this.tiposEntidadService.ENTIDAD = "test";
  }

  
  async getTiposEntidad() {
    const RESPONSE = await this.tiposEntidadService.getAllTiposEntidad().toPromise();
    this.permises = RESPONSE.permises;

    if (RESPONSE.ok) {
      this.tiposEntidadService.tipoEntidad = RESPONSE.data as TipoEntidad[];
      this.displayedColumns = ['id_tipo_entidad', 'tipo_entidad', 'actions'];
      this.dataSource.data = this.tiposEntidadService.tipoEntidad;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();
      this.onChanges();
    }  
  }

  async addTipoEntidad() {
    const dialogRef = this.dialog.open(AddTipoEntidadComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.tiposEntidadService.tipoEntidad.push(RESULT.data);
        //this.dataSource.data = this.tiposEntidadService.tipoEntidad;
        this.ngOnInit();
      }
    }  
  }

  async editTipoEntidad(tipoEntidad: TipoEntidad) {
    const dialogRef = this.dialog.open(EditTipoEntidadComponent, { data: tipoEntidad, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.tiposEntidadService.editTipoEntidad(RESULT.data);
        //this.dataSource.data = this.tiposEntidadService.tipoEntidad;
        this.ngOnInit();
      }
    }  
  }

  async deleteTipoEntidad(tipoEntidad: TipoEntidad) {
    const dialogRef = this.dialog.open(DeleteTipoEntidadComponent, { data: tipoEntidad, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.tiposEntidadService.deleteTipoEntidad(RESULT.data);
        //this.dataSource.data = this.tiposEntidadService.tipoEntidad;
        this.ngOnInit();
      }
    }
  }

  createFilter(): (tipoEntidad: TipoEntidad, filter: string) => boolean {
    const filterFunction = (tipoEntidad: TipoEntidad, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);

      return tipoEntidad.id_tipo_entidad.toString().indexOf(searchTerms.id_tipo_entidad) !== -1
        && tipoEntidad.tipo_entidad.toLowerCase().indexOf(searchTerms.tipo_entidad.toLowerCase()) !== -1;
    };

    return filterFunction;
  }

  onChanges() {
      this.idTipoEntidadFilter.valueChanges
      .subscribe(value => {
          this.filterValues.id_tipo_entidad = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      }); 
  
      this.tipoEntidadFilter.valueChanges
      .subscribe(value => {
          this.filterValues.tipo_entidad = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      }); 
  }
}
