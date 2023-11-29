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

import { MotivoNodual } from '../shared/interfaces/motivo-nodual';
import { MotivosNodualService } from '../services/motivos-nodual.service';

import { AddMotivoNodualComponent } from './add-motivo-nodual/add-motivo-nodual.component';
import { EditMotivoNodualComponent } from './edit-motivo-nodual/edit-motivo-nodual.component';
import { DeleteMotivoNodualComponent } from './delete-motivo-nodual/delete-motivo-nodual.component';

@Component({
  selector: 'app-motivos-nodual',
  templateUrl: './motivos-nodual.component.html',
  styleUrls: ['./motivos-nodual.component.scss']
})
export class MotivosNodualComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<MotivoNodual> = new MatTableDataSource();

  idMotivoNodualFilter = new FormControl();
  motivoNodualFilter = new FormControl();
  idTipoEntidadFilter = new FormControl();

  permises: Permises;

  displayedColumns: string[];
  private filterValues = { id_motivo_nodual: '', motivo_nodual: '', id_tipo_entidad: '' };

  constructor(
    public dialog: MatDialog,
    private motivosNodualService: MotivosNodualService,
    private overlay: Overlay
  ) { }

  ngOnInit(): void {
    this.getMotivosNodual();
    //this.motivosNodualService.ENTIDAD = "test";
  }

  
  async getMotivosNodual() {
    const RESPONSE = await this.motivosNodualService.getAllMotivosNodual().toPromise();
    this.permises = RESPONSE.permises;

    if (RESPONSE.ok) {
      this.motivosNodualService.motivoNodual = RESPONSE.data as MotivoNodual[];
      this.displayedColumns = ['id_motivo_nodual', 'motivo_nodual', 'id_tipo_entidad', 'actions'];
      this.dataSource.data = this.motivosNodualService.motivoNodual;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();
      this.onChanges();
    }  
  }

  async addMotivoNodual() {
    const dialogRef = this.dialog.open(AddMotivoNodualComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.motivosNodualService.motivoNodual.push(RESULT.data);
        //this.dataSource.data = this.motivosNodualService.motivoNodual;
        this.ngOnInit();
      }
    }  
  }

  async editMotivoNodual(motivoNodual: MotivoNodual) {
    const dialogRef = this.dialog.open(EditMotivoNodualComponent, { data: motivoNodual, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.motivosNodualService.editMotivoNodual(RESULT.data);
        //this.dataSource.data = this.motivosNodualService.motivoNodual;
        this.ngOnInit();
      }
    }  
  }

  async deleteMotivoNodual(motivoNodual: MotivoNodual) {
    const dialogRef = this.dialog.open(DeleteMotivoNodualComponent, { data: motivoNodual, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.motivosNodualService.deleteMotivoNodual(RESULT.data);
        //this.dataSource.data = this.motivosNodualService.motivoNodual;
        this.ngOnInit();
      }
    }
  }

  createFilter(): (motivoNodual: MotivoNodual, filter: string) => boolean {
    const filterFunction = (motivoNodual: MotivoNodual, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);

      return motivoNodual.id_motivo_nodual.toString().indexOf(searchTerms.id_motivo_nodual) !== -1
        && motivoNodual.motivo_nodual.toLowerCase().indexOf(searchTerms.motivo_nodual.toLowerCase()) !== -1;
    };

    return filterFunction;
  }

  onChanges() {
      this.idMotivoNodualFilter.valueChanges
      .subscribe(value => {
          this.filterValues.id_motivo_nodual = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      });
  
      this.motivoNodualFilter.valueChanges
      .subscribe(value => {
          this.filterValues.motivo_nodual = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      });  

      this.idTipoEntidadFilter.valueChanges
      .subscribe(value => {
          this.filterValues.id_tipo_entidad = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      });      
  }
}
