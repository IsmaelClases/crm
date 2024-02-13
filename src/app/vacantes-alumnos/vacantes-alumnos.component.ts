import { Overlay } from '@angular/cdk/overlay';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VacantesAlumnosService } from '../services/vacantes-alumnos.service';
import { VacantesAlumnos } from '../shared/interfaces/vacantes-alumnos';
import { AddVacanteComponent } from './add-vacante/add-vacante.component';
import { DeleteVacanteComponent } from './delete-vacante/delete-vacante.component';
import { EditVacanteComponent } from './edit-vacante/edit-vacante.component';

@Component({
  selector: "app-vacantes-alumnos",
  templateUrl: "./vacantes-alumnos.component.html",
  styleUrls: ["./vacantes-alumnos.component.scss"],
})
export class VacantesAlumnosComponent implements OnInit {
  vacantesAlumnos: VacantesAlumnos[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<VacantesAlumnos> = new MatTableDataSource();

  entidadFilter = new FormControl();
  unidadCentroFilter = new FormControl();

  displayedColumns: string[];
  private filterValues = { entidad: '', unidadCentro: '' };

  constructor(
    public dialog: MatDialog,
    private vacantesAlumnosService: VacantesAlumnosService,
    private overlay: Overlay
  ) {}

  ngOnInit(): void {
    this.getListado();
  }

  async getListado() {
    const RESPONSE = await this.vacantesAlumnosService.getListado().toPromise();

    if (RESPONSE.ok) {
      this.vacantesAlumnos = RESPONSE.data as VacantesAlumnos[];
      this.displayedColumns = ["entidad", "unidad", "num_alumnos", "actions"];
      this.dataSource.data = this.vacantesAlumnos;
      this.dataSource.paginator = this.paginator;
      //this.dataSource.filterPredicate = this.createFilter();

      this.onChanges();
    }
  }

  async getAlumnosSeleccionados(vacante: VacantesAlumnos) {}

  async addVacante() {
    const dialogRef = this.dialog.open(AddVacanteComponent, {
      scrollStrategy: this.overlay.scrollStrategies.noop(),
    });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        this.getListado();
      }
    }
  }

  async editVacante(vacante: VacantesAlumnos) {
    const dialogRef = this.dialog.open(EditVacanteComponent, {
      data: vacante,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
    });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        this.getListado();
      }
    }
  }

  async deleteVacante(vacante: VacantesAlumnos) {
    const dialogRef = this.dialog.open(DeleteVacanteComponent, {
      data: vacante,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
    });
    const RESULT = await dialogRef.afterClosed().toPromise();
    if (RESULT) {
      if (RESULT.ok) {
        this.getListado();
      }
    }
  }

  //Pendiente de arreglar
  createFilter(): (unidadCentro: string, filter: string) => boolean {
    const filterFunction = (unidadCentro: string, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);

      return (
        unidadCentro
          .toLowerCase()
          .indexOf(searchTerms.unidad_centro.toLowerCase()) !== -1
      );
    };

    return filterFunction;
  }

  onChanges(): void {
    this.entidadFilter.valueChanges.subscribe((value) => {
      this.filterValues.entidad = value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.unidadCentroFilter.valueChanges.subscribe((value) => {
      this.filterValues.unidadCentro = value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
  }
}
