import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { FormControl } from '@angular/forms';
import { Permises } from 'src/app/shared/interfaces/api-response';

import { Unidad } from 'src/app/shared/interfaces/unidad';
import { UnidadesService } from 'src/app/services/unidades.service';

import { AddUnidadComponent } from './add-unidad/add-unidad.component';
import { EditUnidadComponent } from './edit-unidad/edit-unidad.component';
import { DeleteUnidadComponent } from './delete-unidad/delete-unidad.component';
import { Entidad } from '../../../shared/interfaces/entidad';
import { EntidadesService } from '../../../services/entidades.service';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.scss']
})
export class UnidadesComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<Unidad> = new MatTableDataSource();

  idUnidadFilter = new FormControl();
  idCicloFilter = new FormControl();
  unidadFilter = new FormControl();
  plazasFilter = new FormControl();
  idUnidadDualFilter = new FormControl();
  idMotivoNodualFilter = new FormControl();
  entidad: Entidad;

  permises: Permises;

  displayedColumns: string[];
  private filterValues = { id_unidad: '', id_ciclo: '', unidad: '', plazas: '', id_unidad_dual: '', id_motivo_nodual: '' };

  constructor(
    public dialog: MatDialog,
    private unidadesService: UnidadesService,
    private overlay: Overlay,

    public entidadService: EntidadesService
  ) { }

  ngOnInit(): void {
    this.entidad = this.entidadService.entidad;
    this.getUnidades(this.entidad);
    //this.createFilter();
    //this.onChanges();
  }

  
  async getUnidades(entidad: Entidad) {
    const RESPONSE = await this.unidadesService.getUnidades(entidad.id_entidad).toPromise();
    this.permises = RESPONSE.permises;

    if (RESPONSE.ok) {
      this.unidadesService.unidad = RESPONSE.data as Unidad[];
      this.displayedColumns = ['id_ciclo', 'unidad', 'plazas', 'id_unidad_dual', 'id_motivo_nodual', 'actions'];
      this.dataSource.data = this.unidadesService.unidad;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();
      this.onChanges();
    }  
  }

  async addUnidad(idEntidad: number) {
    const dialogRef = this.dialog.open(AddUnidadComponent, { data: idEntidad, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        this.ngOnInit();
      }
    }  
  }

  async editUnidad(unidad: Unidad) {
    const dialogRef = this.dialog.open(EditUnidadComponent, { data: unidad, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        this.ngOnInit();
      }
    }  
  }

  async deleteUnidad(unidad: Unidad) {
    const dialogRef = this.dialog.open(DeleteUnidadComponent, { data: unidad, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        this.ngOnInit();
      }
    }
  }
  

  createFilter(): (unidad: Unidad, filter: string) => boolean {
    const filterFunction = (unidad: Unidad, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);

      return unidad.id_unidad.toString().indexOf(searchTerms.id_unidad) !== -1
        && unidad.fk_ciclo.toLowerCase().indexOf(searchTerms.fk_ciclo.toLowerCase()) !== -1
        && unidad.unidad.toLowerCase().indexOf(searchTerms.unidad.toLowerCase()) !== -1
        && unidad.plazas.toString().indexOf(searchTerms.plazas.toLowerCase()) !== -1
        && unidad.fk_unidad_dual.toLowerCase().indexOf(searchTerms.fk_unidad_dual.toLowerCase()) !== -1
        && unidad.fk_motivo_nodual.toLowerCase().indexOf(searchTerms.fk_motivo_nodual.toLowerCase()) !== -1;
        // TODO Arreglar esto
    };

    return filterFunction;
  }

  onChanges() {
    this.idUnidadFilter.valueChanges.subscribe(value => {
        this.filterValues.id_unidad = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.idCicloFilter.valueChanges
    .subscribe(value => {
        this.filterValues.id_ciclo = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.unidadFilter.valueChanges
    .subscribe(value => {
        this.filterValues.unidad = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.plazasFilter.valueChanges
    .subscribe(value => {
        this.filterValues.plazas = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.idUnidadDualFilter.valueChanges
    .subscribe(value => {
        this.filterValues.id_unidad_dual = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.idMotivoNodualFilter.valueChanges
    .subscribe(value => {
        this.filterValues.id_motivo_nodual = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });
  }

}
