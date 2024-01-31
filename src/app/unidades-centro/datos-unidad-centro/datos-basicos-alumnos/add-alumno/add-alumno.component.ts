import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AlumnoService } from 'src/app/services/alumno.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Alumno } from 'src/app/shared/interfaces/alumno';
import { CLOSE, INVALID_FORM } from 'src/app/shared/messages';

@Component({
  selector: 'app-add-alumno',
  templateUrl: './add-alumno.component.html',
  styleUrls: ['./add-alumno.component.scss']
})
export class AddAlumnoComponent implements OnInit {
  alumnoForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddAlumnoComponent>,
    private snackBar: MatSnackBar,
    private alumnoService: AlumnoService,
    @Inject(MAT_DIALOG_DATA) public centro_actual: number
  ) {}

  ngOnInit() {
    this.alumnoForm = new FormGroup({
      id: new FormControl(null, Validators.required),
      nombre: new FormControl(null, Validators.required),
      apellidos: new FormControl(null, Validators.required),
      fecha_nacimiento: new FormControl(null, Validators.required),
      linkedin: new FormControl(null, Validators.required),
      nivel_ingles: new FormControl(null, Validators.required),
      minusvalia: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
      otra_formacion: new FormControl(null),
      centro_actual: new FormControl(this.centro_actual)
    });
  }

  async confirmAdd() {
    if (this.alumnoForm.valid) {
      //agregar centro al formulario
      const alumno = this.alumnoForm.value as Alumno;
      const RESPONSE = await this.alumnoService.addAlumno(alumno).toPromise();

      if (RESPONSE.ok) {
        this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
        this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
      } else {
        this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
      }
    } else {
      this.snackBar.open(INVALID_FORM, CLOSE, { duration: 5000 });
    }
  }

  onNoClick() {
    this.dialogRef.close({ ok: false });
  }
}
