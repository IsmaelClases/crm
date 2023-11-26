import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { FormControl } from '@angular/forms';
import { Permises } from '../shared/interfaces/api-response';

import { Zona } from '../shared/interfaces/zona';
import { ZonasService } from '../services/zonas.service';

import { AddZonaComponent } from './add-zona/add-zona.component';
import { EditZonaComponent } from './edit-zona/edit-zona.component';
import { DeleteZonaComponent } from './delete-zona/delete-zona.component';

@Component({
  selector: 'app-zonas',
  templateUrl: './zonas.component.html',
  styleUrls: ['./zonas.component.scss']
})
export class ZonasComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<Zona> = new MatTableDataSource();

  idZonaFilter = new FormControl();
  zonaFilter = new FormControl();

  permises: Permises;

  displayedColumns: string[];
  private filterValues = { id_zona: '', zona: '' };

  constructor(
    public dialog: MatDialog,
    private zonasService: ZonasService,
    private overlay: Overlay
  ) { }

  ngOnInit(): void {
    this.getZonas();
  }

  
  async getZonas() {
    const RESPONSE = await this.zonasService.getAllZonas().toPromise();
    this.permises = RESPONSE.permises;

    if (RESPONSE.ok) {
      this.zonasService.zona = RESPONSE.data as Zona[];
      this.displayedColumns = ['id_zona', 'zona', 'actions'];
      this.dataSource.data = this.zonasService.zona;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();
      this.onChanges();
    }  
  }

  async addZona() {
    const dialogRef = this.dialog.open(AddZonaComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        this.ngOnInit();
      }
    }  
  }

  async editZona(zona: Zona) {
    const dialogRef = this.dialog.open(EditZonaComponent, { data: zona, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        this.ngOnInit();
      }
    }  
  }

  async deleteZona(zona: Zona) {
    const dialogRef = this.dialog.open(DeleteZonaComponent, { data: zona, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        this.ngOnInit();
      }
    }
  }

  createFilter(): (zona: Zona, filter: string) => boolean {
    const filterFunction = (zona: Zona, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);

      return zona.id_zona.toString().indexOf(searchTerms.id_zona) !== -1
        && zona.zona.toLowerCase().indexOf(searchTerms.zona.toLowerCase()) !== -1;
    };

    return filterFunction;
  }

  onChanges() {
      this.idZonaFilter.valueChanges
      .subscribe(value => {
          this.filterValues.id_zona = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      });

      this.zonaFilter.valueChanges
      .subscribe(value => {
          this.filterValues.zona = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      });
  }
}
