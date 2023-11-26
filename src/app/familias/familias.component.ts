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

import { Familia } from '../shared/interfaces/familia';
import { FamiliasService } from '../services/familias.service';

import { AddFamiliaComponent } from './add-familia/add-familia.component';
import { EditFamiliaComponent } from './edit-familia/edit-familia.component';
import { DeleteFamiliaComponent } from './delete-familia/delete-familia.component';

@Component({
  selector: 'app-familias',
  templateUrl: './familias.component.html',
  styleUrls: ['./familias.component.scss']
})
export class FamiliasComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<Familia> = new MatTableDataSource();

  idFamiliaFilter = new FormControl();
  familiaFilter = new FormControl();

  permises: Permises;

  displayedColumns: string[];
  private filterValues = { id_familia: '', familia: '' };

  constructor(
    public dialog: MatDialog,
    private familiasService: FamiliasService,
    private overlay: Overlay
  ) { }

  ngOnInit(): void {
    this.getFamilias();
  }

  
  async getFamilias() {
    const RESPONSE = await this.familiasService.getAllFamilias().toPromise();
    this.permises = RESPONSE.permises;

    if (RESPONSE.ok) {
      this.familiasService.familia = RESPONSE.data as Familia[];
      this.displayedColumns = ['id_familia', 'familia', 'actions'];
      this.dataSource.data = this.familiasService.familia;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();
      this.onChanges();
    }  
  }

  async addFamilia() {
    const dialogRef = this.dialog.open(AddFamiliaComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.familiasService.familia.push(RESULT.data);
        //this.dataSource.data = this.familiasService.familia;
        this.ngOnInit();
      }
    }  
  }

  async editFamilia(familia: Familia) {
    const dialogRef = this.dialog.open(EditFamiliaComponent, { data: familia, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.familiasService.editFamilia(RESULT.data);
        //this.dataSource.data = this.familiasService.familia;
        this.ngOnInit();
      }
    }  
  }

  async deleteFamilia(familia: Familia) {
    const dialogRef = this.dialog.open(DeleteFamiliaComponent, { data: familia, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.familiasService.deleteFamilia(RESULT.data);
        //this.dataSource.data = this.familiasService.familia;
        this.ngOnInit();
      }
    }
  }

  createFilter(): (familia: Familia, filter: string) => boolean {
    const filterFunction = (familia: Familia, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);

      return familia.id_familia.toString().indexOf(searchTerms.id_familia) !== -1
        && familia.familia.toLowerCase().indexOf(searchTerms.familia.toLowerCase()) !== -1;
    };

    return filterFunction;
  }

  onChanges() {
    this.idFamiliaFilter.valueChanges
    .subscribe(value => {
        this.filterValues.id_familia = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.familiaFilter.valueChanges
    .subscribe(value => {
        this.filterValues.familia = value;
        this.dataSource.filter = JSON.stringify(this.filterValues);
    });      
  }

}
