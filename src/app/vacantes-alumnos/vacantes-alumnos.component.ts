import { Overlay } from '@angular/cdk/overlay';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VacantesAlumnosService } from '../services/vacantes-alumnos.service';
import { VacantesAlumnos } from '../shared/interfaces/vacantes-alumnos';

@Component({
  selector: 'app-vacantes-alumnos',
  templateUrl: './vacantes-alumnos.component.html',
  styleUrls: ['./vacantes-alumnos.component.scss']
})
export class VacantesAlumnosComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<VacantesAlumnos> = new MatTableDataSource();

  unidadCentroFilter = new FormControl();
  displayedColumns: string[];
  private filterValues = { unidad_centro: '' }

  constructor(
    public dialog: MatDialog,
    private vacantesAlumnos: VacantesAlumnosService,
    private overlay: Overlay,
  ) { }

  ngOnInit(): void {
    this.getListado();
  }

  async getListado() {
    //const RESPONSE = await this.vacantesAlumnos.getListado().toPromise();
    const RESPONSE = await this.vacantesAlumnos.getListado();

    if (RESPONSE.ok) {
      this.vacantesAlumnos.vacantesAlumnos = RESPONSE.data as VacantesAlumnos[];
      this.displayedColumns = ['unidad_centro'];
      this.dataSource.data = this.vacantesAlumnos.vacantesAlumnos;
      console.log(this.dataSource.data)
      this.dataSource.paginator = this.paginator;
      // this.dataSource.filterPredicate = this.createFilter();

      this.onChanges();
    }
  }

  //Pendiente de arregla xd
  createFilter(): (unidadCentro: string, filter: string) => boolean {
    const filterFunction = (unidadCentro: string, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);

      return unidadCentro.toLowerCase().indexOf(searchTerms.unidad_centro.toLowerCase()) !== -1;
    };

    return filterFunction;
  }

  onChanges(): void {
    this.unidadCentroFilter.valueChanges.subscribe(value => {
      this.filterValues.unidad_centro = value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    })
  }
}
