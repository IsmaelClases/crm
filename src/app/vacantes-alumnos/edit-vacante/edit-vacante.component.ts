import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CLOSE, INVALID_FORM } from "../../shared/messages";
import { UnidadesCentroService } from "src/app/services/unidades-centro.service";
import { EntidadesService } from "src/app/services/entidades.service";
import { Entidad } from "src/app/shared/interfaces/entidad";
import { Alumno } from "src/app/shared/interfaces/alumno";
import { UnidadesCentro } from "src/app/shared/interfaces/unidades-centro";
import { VacantesAlumnosService } from "src/app/services/vacantes-alumnos.service";
import { VacantesAlumnos } from "src/app/shared/interfaces/vacantes-alumnos";

@Component({
  selector: "app-edit-vacante",
  templateUrl: "./edit-vacante.component.html",
  styleUrls: ["./edit-vacante.component.scss"],
})
export class EditVacanteComponent implements OnInit {
  vacanteForm: FormGroup;
  entidades: Entidad[];
  unidades: UnidadesCentro[];

  alumnosTotales: Alumno[];
  alumnosSeleccionados: Alumno[];
  alumnosSeleccionadosControl = new FormControl();
  alumnoSeleccionado: string;

  constructor(
    public dialogRef: MatDialogRef<EditVacanteComponent>,
    private vacantesService: VacantesAlumnosService,
    private entidadesService: EntidadesService,
    private unidadCentroService: UnidadesCentroService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public vacante: VacantesAlumnos
  ) {
    this.alumnosTotales = [];
    this.alumnosSeleccionados = [];
  }

  ngOnInit(): void {
    this.vacanteForm = new FormGroup({
      id_vacante: new FormControl(this.vacante.id_vacante),
      id_entidad: new FormControl(this.vacante.id_entidad, Validators.required),
      id_unidad_centro: new FormControl(
        this.vacante.id_unidad_centro,
        Validators.required
      ),
      num_alumnos: new FormControl(
        this.vacante.num_alumnos,
        Validators.required
      ),
    });

    this.getEntidades();
    this.getUnidadesCentro();
    this.getAlumnado();
  }

  asignarAlumno(alumnoSeleccionado: string) {
    const alumnoSeleccionadoObj = this.alumnosTotales.find(
      (alumno) => alumno.nombre + " " + alumno.apellidos === alumnoSeleccionado
    );

    if (alumnoSeleccionadoObj) {
      this.alumnosTotales = this.alumnosTotales.filter(
        (alumno) => alumno !== alumnoSeleccionadoObj
      );
      this.alumnosSeleccionados.push(alumnoSeleccionadoObj);
    }
    this.alumnosSeleccionadosControl.setValue("");
  }

  quitarAlumno(alumnoSeleccionado: Alumno) {
    const index = this.alumnosSeleccionados.indexOf(alumnoSeleccionado);
    if (index !== -1) {
      this.alumnosSeleccionados.splice(index, 1);
      this.alumnosTotales.push(alumnoSeleccionado);
    }
  }

  comprobarMinimo(cantidad: number) {
    if (cantidad < this.alumnosSeleccionados.length) {
      this.vacanteForm
        .get("num_alumnos")
        .setValue(this.alumnosSeleccionados.length);
    }
  }

  async confirmEdit() {
    if (this.vacanteForm.valid) {
      const vacante = this.vacanteForm.value;
      const idsAlumnos: number[] = this.alumnosSeleccionados.map((alumno) => {
        return Number(alumno.id);
      });
      const RESP = await this.vacantesService.editVacante(vacante).toPromise();
      if (RESP.ok) {
        const RESP2 = await this.vacantesService
          .addAlumnosSeleccionados(vacante.id_vacante, idsAlumnos)
          .toPromise();
        this.snackBar.open(RESP.message, CLOSE, { duration: 5000 });
        this.dialogRef.close({ ok: RESP.ok, data: RESP.data });
      } else {
        this.snackBar.open(RESP.message, CLOSE, { duration: 5000 });
      }
    } else {
      this.snackBar.open(INVALID_FORM, CLOSE, { duration: 5000 });
    }
  }

  async getAlumnado() {
    const RESPONSE = await this.vacantesService
      .getAlumnado(this.vacante.id_vacante, this.vacante.id_unidad_centro)
      .toPromise();
    if (RESPONSE.ok) {
      RESPONSE.data.forEach((alumno) => {
        if (alumno["estado"] == "asignado") {
          this.alumnosSeleccionados.push(alumno);
        } else {
          this.alumnosTotales.push(alumno);
        }
      });
    }
  }

  async getEntidades() {
    const RESPONSE = await this.entidadesService.get().toPromise();
    if (RESPONSE.ok) {
      this.entidades = RESPONSE.data as Entidad[];
    }
  }

  async getUnidadesCentro() {
    const RESPONSE = await this.unidadCentroService.get().toPromise();
    if (RESPONSE.ok) {
      this.unidades = RESPONSE.data as UnidadesCentro[];
    }
  }

  onNoClick(): void {
    this.dialogRef.close({ ok: false });
  }
}
