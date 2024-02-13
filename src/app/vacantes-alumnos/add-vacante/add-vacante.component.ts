import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CLOSE, INVALID_FORM } from "../../shared/messages";
import { EntidadesService } from "src/app/services/entidades.service";
import { Entidad } from "src/app/shared/interfaces/entidad";
import { VacantesAlumnosService } from "src/app/services/vacantes-alumnos.service";
import { UnidadesCentroService } from "src/app/services/unidades-centro.service";
import { UnidadesCentro } from "src/app/shared/interfaces/unidades-centro";

@Component({
  selector: "app-add-vacante",
  templateUrl: "./add-vacante.component.html",
  styleUrls: ["./add-vacante.component.scss"],
})
export class AddVacanteComponent implements OnInit {
  vacanteForm: FormGroup;
  entidades: Entidad[];
  unidadesCentro: UnidadesCentro[];

  constructor(
    public dialogRef: MatDialogRef<AddVacanteComponent>,
    private vacanteService: VacantesAlumnosService,
    private entidadService: EntidadesService,
    private unidadCentroService: UnidadesCentroService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.vacanteForm = new FormGroup({
      id_vacante: new FormControl(0),
      id_entidad: new FormControl(null, Validators.required),
      id_unidad_centro: new FormControl(null, Validators.required),
      num_alumnos: new FormControl(null, Validators.required),
    });

    this.getEntidades();
    this.getUnidades();

  }

  async getEntidades() {
    const RESPONSE = await this.entidadService.get().toPromise();
    if (RESPONSE.ok) {
      this.entidades = RESPONSE.data as Entidad[];
    }
  }

  async getUnidades() {
    const RESPONSE = await this.unidadCentroService.get().toPromise();
    if (RESPONSE.ok) {
      this.unidadesCentro = RESPONSE.data as UnidadesCentro[];
    }
  }

  async confirmAdd() {
    if (this.vacanteForm.valid) {
      const vacante = this.vacanteForm.value;

      const RESP = await this.vacanteService.addVacante(vacante).toPromise();
      if (RESP.ok) {
        this.snackBar.open(RESP.message, CLOSE, { duration: 5000 });
        this.dialogRef.close({ ok: RESP.ok, data: RESP.data });
      } else {
        this.snackBar.open(RESP.message, CLOSE, { duration: 5000 });
      }
    } else {
      this.snackBar.open(INVALID_FORM, CLOSE, { duration: 5000 });
    }
  }

  onNoClick(): void {
    this.dialogRef.close({ ok: false });
  }
}
