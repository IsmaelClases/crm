import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddUnidadesCentroComponent } from './add-unidades-centro/add-unidades-centro.component';
import { EditUnidadesCentroComponent } from './edit-unidades-centro/edit-unidades-centro.component';
import { DeleteUnidadesCentroComponent } from './delete-unidades-centro/delete-unidades-centro.component';
import { UnidadesCentroService } from '../services/unidades-centro.service';
import { FormControl } from '@angular/forms';
import { Overlay } from '@angular/cdk/overlay';
import { UnidadesCentro } from '../shared/interfaces/unidades-centro';
import { Permises } from '../shared/interfaces/api-response';

@Component({
  selector: 'app-unidades-centro',
  templateUrl: './unidades-centro.component.html',
  styleUrls: ['./unidades-centro.component.scss']
})
export class UnidadesCentroComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<UnidadesCentro> = new MatTableDataSource();

  unidadCentroFilter = new FormControl();
  cicloFilter = new FormControl();
  observacionesFilter = new FormControl();

  permises: Permises;

  displayedColumns: string[];
  private filterValues = {unidad_centro: '', cicloFilter: '', observaciones: '' };

  constructor(
    public dialog: MatDialog,
    private unidadesCentroService: UnidadesCentroService,
    private overlay: Overlay
  ) { }

  ngOnInit() {
    this.getUnidadesCentro();
  }

  async getUnidadesCentro() {
    const RESPONSE = await this.unidadesCentroService.getAllUnidadesCentro().toPromise();
    this.permises = RESPONSE.permises;

    if (RESPONSE.ok) {
      this.unidadesCentroService.unidadesCentro = RESPONSE.data as UnidadesCentro[];
      this.displayedColumns = ['unidad_centro', 'ciclo', 'observaciones', 'actions'];
      this.dataSource.data = this.unidadesCentroService.unidadesCentro;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();

      this.onChanges();
    }
  }

  async addUnidadesCentro() {
    const dialogRef = this.dialog.open(AddUnidadesCentroComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        this.unidadesCentroService.unidadesCentro.push(RESULT.data);
        this.dataSource.data = this.unidadesCentroService.unidadesCentro;
      }
    }
  }

  async editUnidadesCentro(unidadCentro: UnidadesCentro) {
    const dialogRef = this.dialog.open(EditUnidadesCentroComponent, { data: unidadCentro, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        this.unidadesCentroService.editUnidadesCentro(RESULT.data);
        this.dataSource.data = this.unidadesCentroService.unidadesCentro;
      }
    }
  }

  async deleteUnidadesCentro(unidadCentro: UnidadesCentro) {
    const dialogRef = this.dialog.open(DeleteUnidadesCentroComponent, { data: unidadCentro, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        this.unidadesCentroService.deleteUnidadesCentro(RESULT.data);
        this.dataSource.data = this.unidadesCentroService.unidadesCentro;
      }
    }
  }

  createFilter(): (unidadCentro: UnidadesCentro, filter: string) => boolean {
    const filterFunction = (unidadCentro: UnidadesCentro, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);

      return unidadCentro.unidad_centro.toLowerCase().indexOf(searchTerms.unidad_centro.toLowerCase()) !== -1
        && unidadCentro.ciclo.toLowerCase().indexOf(searchTerms.cicloFilter.toLowerCase()) !== -1
        && (unidadCentro.observaciones || '').toLowerCase().indexOf(searchTerms.observaciones.toLowerCase()) !== -1;
    };

    return filterFunction;
  }

  onChanges(): void {
    this.unidadCentroFilter.valueChanges.subscribe(value => {
      this.filterValues.unidad_centro = value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.cicloFilter.valueChanges.subscribe(value => {
      this.filterValues.cicloFilter = value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.observacionesFilter.valueChanges.subscribe(value => {
      this.filterValues.observaciones = value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
  }
}
