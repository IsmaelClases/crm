import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipoEntidad } from 'src/app/shared/interfaces/tipo-entidad';
import { TiposEntidadService } from 'src/app/services/tipos-entidad.service';
import { CLOSE, INVALID_FORM, ENTIDAD_TIPO_ENTIDAD } from '../../shared/messages';

@Component({
  selector: 'app-add-tipo-entidad',
  templateUrl: './add-tipo-entidad.component.html',
  styleUrls: ['./add-tipo-entidad.component.scss']
})
export class AddTipoEntidadComponent implements OnInit {
  tipoEntidadForm: FormGroup;

  ENTIDAD: String;

  constructor(public dialogRef: MatDialogRef<AddTipoEntidadComponent>,
    private snackBar: MatSnackBar,
    private servicioTiposEntidad: TiposEntidadService
  ){ }

  ngOnInit(): void {
    this.tipoEntidadForm = new FormGroup({
      tipo_entidad: new FormControl(null, Validators.required),
      observaciones: new FormControl(null)
    });
    this.ENTIDAD = ENTIDAD_TIPO_ENTIDAD;
  }

  async confirmAdd() {
    if (this.tipoEntidadForm.valid) {
      const tipo_entidad = this.tipoEntidadForm.value as TipoEntidad;

      const RESPONSE = await this.servicioTiposEntidad.addTipoEntidad(tipo_entidad).toPromise();
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
