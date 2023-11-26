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

import { ModoReunion } from '../shared/interfaces/modo-reunion';
import { ModosReunionService } from '../services/modos-reunion.service';

import { AddModoReunionComponent } from './add-modo-reunion/add-modo-reunion.component';
import { EditModoReunionComponent } from './edit-modo-reunion/edit-modo-reunion.component';
import { DeleteModoReunionComponent } from './delete-modo-reunion/delete-modo-reunion.component';

@Component({
  selector: 'app-modos-reunion',
  templateUrl: './modos-reunion.component.html',
  styleUrls: ['./modos-reunion.component.scss']
})
export class ModosReunionComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<ModoReunion> = new MatTableDataSource();

  idModoReunionFilter = new FormControl();
  modoReunionFilter = new FormControl();

  permises: Permises;

  displayedColumns: string[];
  private filterValues = { id_modo_reunion: '', modo_reunion: '' };

  constructor(
    public dialog: MatDialog,
    private modosReunionService: ModosReunionService,
    private overlay: Overlay
  ) { }

  ngOnInit(): void {
    this.getModosReunion();
  }

  
  async getModosReunion() {
    const RESPONSE = await this.modosReunionService.getAllModosReunion().toPromise();
    this.permises = RESPONSE.permises;

    if (RESPONSE.ok) {
      this.modosReunionService.modoReunion = RESPONSE.data as ModoReunion[];
      this.displayedColumns = ['id_modo_reunion', 'modo_reunion', 'actions'];
      this.dataSource.data = this.modosReunionService.modoReunion;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();
      this.onChanges();
    }  
  }

  async addModoReunion() {
    const dialogRef = this.dialog.open(AddModoReunionComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.modosReunionService.modoReunion.push(RESULT.data);
        //this.dataSource.data = this.modosReunionService.modoReunion;
        this.ngOnInit();
      }
    }  
  }

  async editModoReunion(modoReunion: ModoReunion) {
    const dialogRef = this.dialog.open(EditModoReunionComponent, { data: modoReunion, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.modosReunionService.editModoReunion(RESULT.data);
        //this.dataSource.data = this.modosReunionService.modoReunion;
        this.ngOnInit();
      }
    }  
  }

  async deleteModoReunion(modoReunion: ModoReunion) {
    const dialogRef = this.dialog.open(DeleteModoReunionComponent, { data: modoReunion, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.modosReunionService.deleteModoReunion(RESULT.data);
        //this.dataSource.data = this.modosReunionService.modoReunion;
        this.ngOnInit();
      }
    }
  }

  createFilter(): (modoReunion: ModoReunion, filter: string) => boolean {
    const filterFunction = (modoReunion: ModoReunion, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);

      return modoReunion.id_modo_reunion.toString().indexOf(searchTerms.id_modo_reunion) !== -1
        && modoReunion.modo_reunion.toLowerCase().indexOf(searchTerms.modo_reunion.toLowerCase()) !== -1;
    };

    return filterFunction;
  }

  onChanges() {
      this.idModoReunionFilter.valueChanges
      .subscribe(value => {
          this.filterValues.id_modo_reunion = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      });
  
      this.modoReunionFilter.valueChanges
      .subscribe(value => {
          this.filterValues.modo_reunion = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      });  
  }

}
