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

import { UnidadDual } from '../shared/interfaces/unidad-dual';
import { UnidadesDualService } from '../services/unidades-dual.service';

import { AddUnidadDualComponent } from './add-unidad-dual/add-unidad-dual.component';
import { EditUnidadDualComponent } from './edit-unidad-dual/edit-unidad-dual.component';
import { DeleteUnidadDualComponent } from './delete-unidad-dual/delete-unidad-dual.component';

@Component({
  selector: 'app-unidades-dual',
  templateUrl: './unidades-dual.component.html',
  styleUrls: ['./unidades-dual.component.scss']
})
export class UnidadesDualComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<UnidadDual> = new MatTableDataSource();

  idUnidadDualFilter = new FormControl();
  unidadDualFilter = new FormControl();

  permises: Permises;

  displayedColumns: string[];
  private filterValues = { id_unidad_dual: '', unidad_dual: '' };

  constructor(
    public dialog: MatDialog,
    private unidadesDualService: UnidadesDualService,
    private overlay: Overlay
  ) { }

  ngOnInit(): void {
    this.getUnidadesDual();
    //this.unidadesDualService.ENTIDAD = "test";
  }

  
  async getUnidadesDual() {
    const RESPONSE = await this.unidadesDualService.getAllUnidadesDual().toPromise();
    this.permises = RESPONSE.permises;

    if (RESPONSE.ok) {
      this.unidadesDualService.unidadDual = RESPONSE.data as UnidadDual[];
      this.displayedColumns = ['id_unidad_dual', 'unidad_dual', 'actions'];
      this.dataSource.data = this.unidadesDualService.unidadDual;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();
      this.onChanges();
    }  
  }

  async addUnidadDual() {
    const dialogRef = this.dialog.open(AddUnidadDualComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.unidadesDualService.unidadDual.push(RESULT.data);
        //this.dataSource.data = this.unidadesDualService.unidadDual;
        this.ngOnInit();
      }
    }  
  }

  async editUnidadDual(unidadDual: UnidadDual) {
    const dialogRef = this.dialog.open(EditUnidadDualComponent, { data: unidadDual, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.unidadesDualService.editUnidadDual(RESULT.data);
        //this.dataSource.data = this.unidadesDualService.unidadDual;
        this.ngOnInit();
      }
    }  
  }

  async deleteUnidadDual(unidadDual: UnidadDual) {
    const dialogRef = this.dialog.open(DeleteUnidadDualComponent, { data: unidadDual, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.unidadesDualService.deleteUnidadDual(RESULT.data);
        //this.dataSource.data = this.unidadesDualService.unidadDual;
        this.ngOnInit();
      }
    }
  }

  createFilter(): (unidadDual: UnidadDual, filter: string) => boolean {
    const filterFunction = (unidadDual: UnidadDual, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);

      return unidadDual.id_unidad_dual.toString().indexOf(searchTerms.id_unidad_dual) !== -1
        && unidadDual.unidad_dual.toLowerCase().indexOf(searchTerms.unidad_dual.toLowerCase()) !== -1;
    };

    return filterFunction;
  }

  onChanges() {
      this.idUnidadDualFilter.valueChanges
      .subscribe(value => {
          this.filterValues.id_unidad_dual = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      }); 
  
      this.unidadDualFilter.valueChanges
      .subscribe(value => {
          this.filterValues.unidad_dual = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      }); 
  }
}
