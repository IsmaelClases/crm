import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { FormControl } from '@angular/forms';
import { Permises } from '../shared/interfaces/api-response';

import { Unidad } from '../shared/interfaces/unidad';
import { UnidadesService } from '../services/unidades.service';
import { Entidad } from '../shared/interfaces/entidad';
import { EntidadesService } from '../services/entidades.service';
// import { AddUnidadComponent } from './add-unidad/add-unidad.component';
// import { EditUnidadComponent } from './edit-unidad/edit-unidad.component';
// import { DeleteUnidadComponent } from './delete-unidad/delete-unidad.component';

import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.scss']
})
export class UnidadesComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<Unidad> = new MatTableDataSource();

  idEntidadFilter = new FormControl();
  idUnidadFilter = new FormControl();
  idCicloFilter = new FormControl();
  unidadFilter = new FormControl();
  plazasFilter = new FormControl();
  idUnidadDualFilter = new FormControl();
  idMotivoNodualFilter = new FormControl();
  idZonaFilter = new FormControl();
  idProvinciaFilter = new FormControl();
  idTipoEntidadFilter = new FormControl();

  permises: Permises;

  selection: SelectionModel<Unidad>;
  unidad: Unidad;

  displayedColumns: string[];
  private filterValues = { id_unidad: '', fk_entidad: '', fk_ciclo: '', unidad: '', plazas: '', fk_unidad_dual: '', fk_motivo_nodual: '', fk_zona: '', fk_provincia: '', fk_tipo_entidad: '' };

  constructor(
    public dialog: MatDialog,
    private unidadesService: UnidadesService,
    private overlay: Overlay
  ) { }

  ngOnInit(): void {
    this.getUnidades();
    //this.createFilter();
    //this.onChanges();
  }

  
  async getUnidades() {
    const RESPONSE = await this.unidadesService.getAllUnidades().toPromise();
    this.permises = RESPONSE.permises;

    if (RESPONSE.ok) {
      this.unidadesService.unidad = RESPONSE.data as Unidad[];
      this.displayedColumns = ['fk_entidad', 'fk_ciclo', 'unidad', 'plazas', 'fk_unidad_dual', 'fk_motivo_nodual', 'fk_zona', 'fk_provincia', 'fk_tipo_entidad', 'actions'];
      this.dataSource.data = this.unidadesService.unidad;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();
      this.selection = new SelectionModel<Unidad>(false, [this.unidad]);

      this.onChanges();
    }  
  }

  async addUnidad() {
    // const dialogRef = this.dialog.open(AddUnidadComponent, { scrollStrategy: this.overlay.scrollStrategies.noop(), disableClose: true });
    // const RESULT = await dialogRef.afterClosed().toPromise();
    // if (RESULT) {
    //   if (RESULT.ok) {
    //     //this.unidadesService.unidad.push(RESULT.data);
    //     //this.dataSource.data = this.unidadesService.unidad;
    //     this.ngOnInit();
    //   }
    // }  
  }

  async editUnidad(unidad: Unidad) {
    // const dialogRef = this.dialog.open(EditUnidadComponent, { data: unidad, scrollStrategy: this.overlay.scrollStrategies.noop(), disableClose: true });
    // const RESULT = await dialogRef.afterClosed().toPromise();
    // if (RESULT) {
    //   if (RESULT.ok) {
    //     //this.unidadesService.editUnidad(RESULT.data);
    //     //this.dataSource.data = this.unidadesService.unidad;
    //     this.ngOnInit();
    //   }
    // }  
  }

  async deleteUnidad(unidad: Unidad) {
    // const dialogRef = this.dialog.open(DeleteUnidadComponent, { data: unidad, scrollStrategy: this.overlay.scrollStrategies.noop() });
    // const RESULT = await dialogRef.afterClosed().toPromise();
    // if (RESULT) {
    //   if (RESULT.ok) {
    //     //this.unidadesService.deleteUnidad(RESULT.data);
    //     //this.dataSource.data = this.unidadesService.unidad;
    //     this.ngOnInit();
    //   }
    // }
  }

  createFilter(): (unidad: Unidad, filter: string) => boolean {
    const filterFunction = (unidad: Unidad, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);

      return unidad.id_unidad.toString().indexOf(searchTerms.id_unidad) !== -1
        && unidad.fk_entidad.toLowerCase().indexOf(searchTerms.fk_entidad.toLowerCase()) !== -1
        && unidad.fk_ciclo.toLowerCase().indexOf(searchTerms.fk_ciclo.toLowerCase()) !== -1
        && unidad.unidad.toLowerCase().indexOf(searchTerms.unidad.toLowerCase()) !== -1
        && unidad.plazas.toString().indexOf(searchTerms.plazas.toLowerCase()) !== -1
        && unidad.fk_unidad_dual.toLowerCase().indexOf(searchTerms.fk_unidad_dual.toLowerCase()) !== -1
        && unidad.fk_motivo_nodual.toLowerCase().indexOf(searchTerms.fk_motivo_nodual.toLowerCase()) !== -1
        && unidad.fk_zona.toLowerCase().indexOf(searchTerms.fk_zona.toLowerCase()) !== -1
        && unidad.fk_provincia.toLowerCase().indexOf(searchTerms.fk_provincia.toLowerCase()) !== -1
        && unidad.fk_tipo_entidad.toLowerCase().indexOf(searchTerms.fk_tipo_entidad.toLowerCase()) !== -1;
       // TODO Arreglar esto
    };

    return filterFunction;
  }

  onChanges() {
    this.idUnidadFilter.valueChanges.subscribe(value => {
        this.filterValues.id_unidad = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.idEntidadFilter.valueChanges
    .subscribe(value => {
        this.filterValues.fk_entidad = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.idCicloFilter.valueChanges
    .subscribe(value => {
        this.filterValues.fk_ciclo = value;
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
        this.filterValues.fk_unidad_dual = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.idMotivoNodualFilter.valueChanges
    .subscribe(value => {
        this.filterValues.fk_motivo_nodual = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.idZonaFilter.valueChanges
    .subscribe(value => {
        this.filterValues.fk_zona = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.idProvinciaFilter.valueChanges
    .subscribe(value => {
        this.filterValues.fk_provincia = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });  

    this.idTipoEntidadFilter.valueChanges
    .subscribe(value => {
        this.filterValues.fk_tipo_entidad = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    }); 
  }
}
