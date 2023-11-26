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

import { MotivoReunion } from '../shared/interfaces/motivo-reunion';
import { MotivosReunionService } from '../services/motivos-reunion.service';

import { AddMotivoReunionComponent } from './add-motivo-reunion/add-motivo-reunion.component';
import { EditMotivoReunionComponent } from './edit-motivo-reunion/edit-motivo-reunion.component';
import { DeleteMotivoReunionComponent } from './delete-motivo-reunion/delete-motivo-reunion.component';

@Component({
  selector: 'app-motivos-reunion',
  templateUrl: './motivos-reunion.component.html',
  styleUrls: ['./motivos-reunion.component.scss']
})
export class MotivosReunionComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<MotivoReunion> = new MatTableDataSource();

  idMotivoReunionFilter = new FormControl();
  motivoReunionFilter = new FormControl();

  permises: Permises;

  displayedColumns: string[];
  private filterValues = { id_motivo_reunion: '', motivo_reunion: '' };

  constructor(
    public dialog: MatDialog,
    private motivosReunionService: MotivosReunionService,
    private overlay: Overlay
  ) { }

  ngOnInit(): void {
    this.getMotivosReunion();
    //this.motivosReunionService.ENTIDAD = "test";
  }

  
  async getMotivosReunion() {
    const RESPONSE = await this.motivosReunionService.getAllMotivosReunion().toPromise();
    this.permises = RESPONSE.permises;

    if (RESPONSE.ok) {
      this.motivosReunionService.motivoReunion = RESPONSE.data as MotivoReunion[];
      this.displayedColumns = ['id_motivo_reunion', 'motivo_reunion', 'actions'];
      this.dataSource.data = this.motivosReunionService.motivoReunion;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();
      this.onChanges();
    }  
  }

  async addMotivoReunion() {
    const dialogRef = this.dialog.open(AddMotivoReunionComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.motivosReunionService.motivoReunion.push(RESULT.data);
        //this.dataSource.data = this.motivosReunionService.motivoReunion;
        this.ngOnInit();
      }
    }  
  }

  async editMotivoReunion(motivoReunion: MotivoReunion) {
    const dialogRef = this.dialog.open(EditMotivoReunionComponent, { data: motivoReunion, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.motivosReunionService.editMotivoReunion(RESULT.data);
        //this.dataSource.data = this.motivosReunionService.motivoReunion;
        this.ngOnInit();
      }
    }  
  }

  async deleteMotivoReunion(motivoReunion: MotivoReunion) {
    const dialogRef = this.dialog.open(DeleteMotivoReunionComponent, { data: motivoReunion, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.motivosReunionService.deleteMotivoReunion(RESULT.data);
        //this.dataSource.data = this.motivosReunionService.motivoReunion;
        this.ngOnInit();
      }
    }
  }

  createFilter(): (motivoReunion: MotivoReunion, filter: string) => boolean {
    const filterFunction = (motivoReunion: MotivoReunion, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);

      return motivoReunion.id_motivo_reunion.toString().indexOf(searchTerms.id_motivo_reunion) !== -1
        && motivoReunion.motivo_reunion.toLowerCase().indexOf(searchTerms.motivo_reunion.toLowerCase()) !== -1;
    };

    return filterFunction;
  }

  onChanges() {
      this.idMotivoReunionFilter.valueChanges
      .subscribe(value => {
          this.filterValues.id_motivo_reunion = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      });
  
      this.motivoReunionFilter.valueChanges
      .subscribe(value => {
          this.filterValues.motivo_reunion = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      });  
  }
}
