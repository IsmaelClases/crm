import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Alumno } from 'src/app/shared/interfaces/alumno';
import { AlumnoService } from 'src/app/services/alumno.service';
import { CLOSE, INVALID_FORM } from 'src/app/shared/messages';

@Component({
  selector: 'app-edit-alumno',
  templateUrl: './edit-alumno.component.html',
  styleUrls: ['./edit-alumno.component.scss']
})
export class EditAlumnoComponent implements OnInit {

  alumnoForm: FormGroup;
  alumno: Alumno;

  constructor(
    public dialogRef: MatDialogRef<EditAlumnoComponent>,
    private snackBar: MatSnackBar,
    private alumnoService: AlumnoService,
    @Inject(MAT_DIALOG_DATA) public data: Alumno
  ) {
    this.alumno = { ...data };
  }

  ngOnInit() {
    this.alumnoForm = new FormGroup({
      id: new FormControl(this.alumno.id),
      nombre: new FormControl(this.alumno.nombre, Validators.required),
      apellidos: new FormControl(this.alumno.apellidos, Validators.required),
      fecha_nacimiento: new FormControl(this.alumno.fecha_nacimiento, Validators.required),
      linkedin: new FormControl(this.alumno.linkedin, Validators.required),
      nivel_ingles: new FormControl(this.alumno.nivel_ingles, Validators.required),
      minusvalia: new FormControl(this.alumno.minusvalia, Validators.required),
      otra_formacion: new FormControl(this.alumno.otra_formacion),
      centro_actual: new FormControl(this.alumno.centro_actual, Validators.required)
    });
  }

  async confirmEdit() {
    if (this.alumnoForm.valid) {
      const alumno = this.alumnoForm.value;

      try {
        const RESPONSE = await this.alumnoService.editAlumno(alumno).toPromise();

        if (RESPONSE.ok) {
          this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
          this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
        } else {
          this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
        }
      } catch (error) {
        console.error('Error al editar el alumno:', error);
        this.snackBar.open('Error al editar el alumno', CLOSE, { duration: 5000 });
      }
    } else {
      this.snackBar.open(INVALID_FORM, CLOSE, { duration: 5000 });
    }
  }

  onNoClick() {
    this.dialogRef.close({ ok: false });
  }
}
