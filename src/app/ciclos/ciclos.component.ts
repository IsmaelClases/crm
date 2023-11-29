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

import { Ciclo } from '../shared/interfaces/ciclo';
import { CiclosService } from '../services/ciclos.service';

import { AddCicloComponent } from './add-ciclo/add-ciclo.component';
import { EditCicloComponent } from './edit-ciclo/edit-ciclo.component';
import { DeleteCicloComponent } from './delete-ciclo/delete-ciclo.component';

@Component({
  selector: 'app-ciclos',
  templateUrl: './ciclos.component.html',
  styleUrls: ['./ciclos.component.scss']
})
export class CiclosComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<Ciclo> = new MatTableDataSource();

  idCicloFilter = new FormControl();
  cicloFilter = new FormControl();
  codCicloFilter = new FormControl();
  idNivelFilter = new FormControl();
  idFamiliaFilter = new FormControl();

  permises: Permises;

  displayedColumns: string[];
  private filterValues = { id_ciclo: '', ciclo: '', cod_ciclo: '' , id_nivel: '', id_familia: '' };

  constructor(
    public dialog: MatDialog,
    private ciclosService: CiclosService,
    private overlay: Overlay
  ) { }

  ngOnInit(): void {
    this.getCiclos();
    //this.ciclosService.ENTIDAD = "test";
  }

  
  async getCiclos() {
    const RESPONSE = await this.ciclosService.getAllCiclos().toPromise();
    this.permises = RESPONSE.permises;

    if (RESPONSE.ok) {
      this.ciclosService.ciclo = RESPONSE.data as Ciclo[];
      this.displayedColumns = ['id_ciclo', 'ciclo', 'cod_ciclo', 'id_nivel', 'id_familia', 'actions'];
      this.dataSource.data = this.ciclosService.ciclo;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();
      this.onChanges();
    }  
  }

  async addCiclo() {
    const dialogRef = this.dialog.open(AddCicloComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.ciclosService.ciclo.push(RESULT.data);
        //this.dataSource.data = this.ciclosService.ciclo;
        this.ngOnInit();
      }
    }  
  }

  async editCiclo(ciclo: Ciclo) {
    const dialogRef = this.dialog.open(EditCicloComponent, { data: ciclo, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.ciclosService.editCiclo(RESULT.data);
        //this.dataSource.data = this.ciclosService.ciclo;
        this.ngOnInit();
      }
    }  
  }

  async deleteCiclo(ciclo: Ciclo) {
    const dialogRef = this.dialog.open(DeleteCicloComponent, { data: ciclo, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.ciclosService.deleteCiclo(RESULT.data);
        //this.dataSource.data = this.ciclosService.ciclo;
        this.ngOnInit();
      }
    }
  }

  createFilter(): (ciclo: Ciclo, filter: string) => boolean {
    const filterFunction = (ciclo: Ciclo, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);

      return ciclo.id_ciclo.toString().indexOf(searchTerms.id_ciclo) !== -1
        && ciclo.ciclo.toLowerCase().indexOf(searchTerms.ciclo.toLowerCase()) !== -1
        && ciclo.cod_ciclo.toLowerCase().indexOf(searchTerms.cod_ciclo.toLowerCase()) !== -1
        && ciclo.fk_nivel.toLowerCase().indexOf(searchTerms.id_nivel.toLowerCase()) !== -1
        && ciclo.fk_familia.toLowerCase().indexOf(searchTerms.id_familia.toLowerCase()) !== -1;
    };

    return filterFunction;
  }

  onChanges() {
      this.idCicloFilter.valueChanges
      .subscribe(value => {
          this.filterValues.id_ciclo = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      });
  
      this.cicloFilter.valueChanges
      .subscribe(value => {
          this.filterValues.ciclo = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      });  

      this.codCicloFilter.valueChanges
      .subscribe(value => {
          this.filterValues.cod_ciclo = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      }); 
    
      this.idNivelFilter.valueChanges
      .subscribe(value => {
          this.filterValues.id_nivel = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      });     

      this.idFamiliaFilter.valueChanges
      .subscribe(value => {
          this.filterValues.id_familia = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      });     
  }
}
