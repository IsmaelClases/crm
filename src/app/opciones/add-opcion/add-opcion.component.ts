// import {URL_API} from '../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OpcionesService } from 'src/app/services/opciones.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Opcion } from 'src/app/shared/interfaces/opcion';
import { CLOSE, INVALID_FORM } from '../../shared/messages';

@Component({
  selector: 'app-add-opcion',
  templateUrl: './add-opcion.component.html',
  styleUrls: ['./add-opcion.component.scss']
})
export class AddOpcionComponent implements OnInit {
  opcionForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddOpcionComponent>,
              private snackBar: MatSnackBar,
              private servicioOpciones: OpcionesService
  ) {

  }

  ngOnInit() {
    this.opcionForm = new FormGroup({
      opcion: new FormControl(null, Validators.required),
      accion: new FormControl(null, Validators.required),
      texto_tooltip: new FormControl(null),
      observaciones: new FormControl(null)
    });
  }

  async confirmAdd() {
    if (this.opcionForm.valid) {
      const opcion = this.opcionForm.value as Opcion;

      const RESPONSE = await this.servicioOpciones.addOpcion(opcion).toPromise();
      if (RESPONSE.ok) {
        this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
        this.dialogRef.close({ok: RESPONSE.ok, data: RESPONSE.data});
      } else {
        this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
      }
    } else {
      this.snackBar.open(INVALID_FORM, CLOSE, { duration: 5000 });
    }
  }

  onNoClick() {
    this.dialogRef.close({ok: false});
  }

}
