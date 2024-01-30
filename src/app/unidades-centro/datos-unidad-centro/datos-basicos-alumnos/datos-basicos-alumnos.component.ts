import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { Overlay } from '@angular/cdk/overlay';
import { AlumnoService } from 'src/app/services/alumno.service';
import { Alumno } from 'src/app/shared/interfaces/alumno';
import { AddAlumnoComponent } from './add-alumno/add-alumno.component'; // Reemplazar con la ruta correcta
import { EditAlumnoComponent } from './edit-alumno/edit-alumno.component'; // Reemplazar con la ruta correcta
import { DeleteAlumnoComponent } from './delete-alumno/delete-alumno.component'; // Reemplazar con la ruta correcta

@Component({
  selector: 'app-datos-basicos-alumnos',
  templateUrl: './datos-basicos-alumnos.component.html',
  styleUrls: ['./datos-basicos-alumnos.component.scss']
})
export class DatosBasicosAlumnosComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: MatTableDataSource<Alumno> = new MatTableDataSource();

  nombreFilter = new FormControl();
  apellidosFilter = new FormControl();
  nivelInglesFilter = new FormControl();
  minusvaliaFilter = new FormControl();
  otraFormacionFilter = new FormControl();

  displayedColumns: string[];

  private filterValues = { 
    nombre: '', 
    apellidos: '',
    nivel_ingles: '', 
    minusvalia: '', 
    otra_formacion: '',
  };

  constructor(
    public dialog: MatDialog,
    private alumnoService: AlumnoService,
    private overlay: Overlay
  ) { }

  ngOnInit() {
    //this.getAlumnos(idCentro);
    this.getAlumnos('2'); // Reemplazar '2' con la lógica adecuada
  }

  async getAlumnos(idCentro: string) {
    const RESPONSE = await this.alumnoService.get(idCentro).toPromise();

    if (RESPONSE.ok) {
      this.alumnoService.alumnos = RESPONSE.data as Alumno[];
      this.displayedColumns = ['nombre', 'apellidos', 'nivel_ingles', 'minusvalia', 'otra_formacion', 'actions'];
      this.dataSource.data = this.alumnoService.alumnos;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.filterPredicate = this.createFilter();

      this.onChanges();
    }
  }

  createFilter(): (alumno: Alumno, filter: string) => boolean {
    const filterFunction = (alumno: Alumno, filter: string): boolean => {
      const searchTerms = JSON.parse(filter);

      return alumno.nombre.toLowerCase().indexOf(searchTerms.nombre.toLowerCase()) !== -1
        && alumno.apellidos.toLowerCase().indexOf(searchTerms.apellidos.toLowerCase()) !== -1
        && (alumno.nivel_ingles || '').toLowerCase().indexOf(searchTerms.nivel_ingles.toLowerCase()) !== -1
        && (alumno.minusvalia || '').toString().indexOf(searchTerms.minusvalia) !== -1
        && (alumno.otra_formacion || '').toLowerCase().indexOf(searchTerms.otra_formacion.toLowerCase()) !== -1;
    };

    return filterFunction;
  }

  onChanges(): void {
    this.nombreFilter.valueChanges.subscribe(value => {
      this.filterValues.nombre = value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.apellidosFilter.valueChanges.subscribe(value => {
      this.filterValues.apellidos = value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.nivelInglesFilter.valueChanges.subscribe(value => {
      this.filterValues.nivel_ingles = value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.minusvaliaFilter.valueChanges.subscribe(value => {
      this.filterValues.minusvalia = value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.otraFormacionFilter.valueChanges.subscribe(value => {
      this.filterValues.otra_formacion = value;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
  }

  async addAlumno() {
    const dialogRef = this.dialog.open(AddAlumnoComponent, { scrollStrategy: this.overlay.scrollStrategies.noop() });
    const result = await dialogRef.afterClosed().toPromise();

    if (result) {
      if (result.ok) {
        this.alumnoService.alumnos.push(result.data);
        this.dataSource.data = this.alumnoService.alumnos;
      }
    }
  }

  async editAlumno(alumno: Alumno) {
    const dialogRef = this.dialog.open(EditAlumnoComponent, { data: alumno, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const result = await dialogRef.afterClosed().toPromise();

    if (result) {
      if (result.ok) {
        // Implementar la edición en el servicio si es necesario
        this.dataSource.data = this.alumnoService.alumnos;
      }
    }
  }

  async deleteAlumno(alumno: Alumno) {
    const dialogRef = this.dialog.open(DeleteAlumnoComponent, { data: alumno, scrollStrategy: this.overlay.scrollStrategies.noop() });
    const result = await dialogRef.afterClosed().toPromise();

    if (result) {
      if (result.ok) {
        // Implementar la eliminación en el servicio si es necesario
        this.dataSource.data = this.alumnoService.alumnos;
      }
    }
  }
}
