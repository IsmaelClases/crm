import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OpcionesService } from 'src/app/services/opciones.service';
import { Opcion } from 'src/app/shared/interfaces/opcion';
import { CLOSE, INVALID_FORM } from '../../shared/messages';
// import { Opcion } from 'src/app/shared/interfaces/opcion';

@Component({
  selector: 'app-edit-opcion',
  templateUrl: './edit-opcion.component.html',
  styleUrls: ['./edit-opcion.component.scss']
})
export class EditOpcionComponent implements OnInit {

  opcionForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<EditOpcionComponent>,
              private snackBar: MatSnackBar,
              private servicioOpciones: OpcionesService,
              @Inject(MAT_DIALOG_DATA) public opcion: Opcion
    ) {

  }

  ngOnInit() {
    this.opcionForm = new FormGroup({
      id_opcion_menu: new FormControl(this.opcion.id_opcion_menu, Validators.required),
      opcion: new FormControl(this.opcion.opcion, Validators.required),
      accion: new FormControl(this.opcion.accion, Validators.required),
      texto_tooltip: new FormControl(this.opcion.texto_tooltip),
      observaciones: new FormControl(this.opcion.observaciones)
    });
  }

  async confirmAdd() {
    if (this.opcionForm.valid) {
      const opcion = this.opcionForm.value;

      const RESPONSE = await this.servicioOpciones.editOpcion(opcion).toPromise();
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
