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

import { Nivel } from '../shared/interfaces/nivel';
import { NivelesService } from '../services/niveles.service';

import { AddNivelComponent } from './add-nivel/add-nivel.component';
import { EditNivelComponent } from './edit-nivel/edit-nivel.component';
import { DeleteNivelComponent } from './delete-nivel/delete-nivel.component';

@Component({
  selector: 'app-niveles',
  templateUrl: './niveles.component.html',
  styleUrls: ['./niveles.component.scss']
})
export class NivelesComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<Nivel> = new MatTableDataSource();

  idNivelFilter = new FormControl();
  nivelFilter = new FormControl();
  codNivelFilter = new FormControl();
  tituloFilter = new FormControl();

  permises: Permises;

  displayedColumns: string[];
  private filterValues = { id_nivel: '', nivel: '', cod_nivel: '' , titulo: '' };

  constructor(
    public dialog: MatDialog,
    private nivelesService: NivelesService,
    private overlay: Overlay
  ) { }

  ngOnInit(): void {
    this.getNiveles();
    //this.nivelesService.ENTIDAD = "test";
  }

  
  async getNiveles() {
    const RESPONSE = await this.nivelesService.getAllNiveles().toPromise();
    this.permises = RESPONSE.permises;

    if (RESPONSE.ok) {
      this.nivelesService.nivel = RESPONSE.data as Nivel[];
      this.displayedColumns = ['id_nivel', 'nivel', 'cod_nivel', 'titulo', 'actions'];
      this.dataSource.data = this.nivelesService.nivel;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();
      this.onChanges();
    }  
  }

  async addNivel() {
    const dialogRef = this.dialog.open(AddNivelComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.nivelesService.nivel.push(RESULT.data);
        //this.dataSource.data = this.nivelesService.nivel;
        this.ngOnInit();
      }
    }  
  }

  async editNivel(nivel: Nivel) {
    const dialogRef = this.dialog.open(EditNivelComponent, { data: nivel, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.nivelesService.editNivel(RESULT.data);
        //this.dataSource.data = this.nivelesService.nivel;
        this.ngOnInit();
      }
    }  
  }

  async deleteNivel(nivel: Nivel) {
    const dialogRef = this.dialog.open(DeleteNivelComponent, { data: nivel, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        //this.nivelesService.deleteNivel(RESULT.data);
        //this.dataSource.data = this.nivelesService.nivel;
        this.ngOnInit();
      }
    }
  }

  createFilter(): (nivel: Nivel, filter: string) => boolean {
    const filterFunction = (nivel: Nivel, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);

      return nivel.id_nivel.toString().indexOf(searchTerms.id_nivel) !== -1
        && nivel.nivel.toLowerCase().indexOf(searchTerms.nivel.toLowerCase()) !== -1
        && nivel.cod_nivel.toLowerCase().indexOf(searchTerms.cod_nivel.toLowerCase()) !== -1
        && nivel.titulo.toLowerCase().indexOf(searchTerms.titulo.toLowerCase()) !== -1;
    };

    return filterFunction;
  }

  onChanges() {
      this.idNivelFilter.valueChanges
      .subscribe(value => {
          this.filterValues.id_nivel = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      });
  
      this.nivelFilter.valueChanges
      .subscribe(value => {
          this.filterValues.nivel = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      });  

      this.codNivelFilter.valueChanges
      .subscribe(value => {
          this.filterValues.cod_nivel = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      }); 
    
      this.tituloFilter.valueChanges
      .subscribe(value => {
          this.filterValues.titulo = value;
          this.dataSource.filter = JSON.stringify(this.filterValues);
      });     
  }
}
