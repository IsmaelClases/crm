import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TiposEntidadService } from 'src/app/services/tipos-entidad.service';
import { TipoEntidad } from 'src/app/shared/interfaces/tipo-entidad';
import { CLOSE, ENTIDAD_TIPO_ENTIDAD, ERROR } from '../../shared/messages';


@Component({
  selector: 'app-edit-tipo-entidad',
  templateUrl: './edit-tipo-entidad.component.html',
  styleUrls: ['./edit-tipo-entidad.component.scss']
})
export class EditTipoEntidadComponent implements OnInit {

  tipoEntidadForm: FormGroup;
  ENTIDAD: String;

  constructor(
    public dialogRef: MatDialogRef<EditTipoEntidadComponent>,
    private snackBar: MatSnackBar,
    private servicioTiposEntidad: TiposEntidadService,
    @Inject(MAT_DIALOG_DATA) public tipoEntidad: TipoEntidad
  ) { }

  ngOnInit(): void {
    this.ENTIDAD = ENTIDAD_TIPO_ENTIDAD;
    this.tipoEntidadForm = new FormGroup({
      id_tipo_entidad: new FormControl(this.tipoEntidad.id_tipo_entidad, Validators.required),
      tipo_entidad: new FormControl(this.tipoEntidad.tipo_entidad, Validators.required),
      observaciones: new FormControl(this.tipoEntidad.observaciones)
    });
  }

  async confirmEdit(){
    if (this.tipoEntidadForm.valid) {
      const tipoEntidadForm = this.tipoEntidadForm.value;

      const RESPONSE = await this.servicioTiposEntidad.editTipoEntidad(tipoEntidadForm).toPromise();
      if (RESPONSE.ok) {
        this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
        this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
      } else { this.snackBar.open(ERROR, CLOSE, { duration: 5000 }); }
    } else { this.snackBar.open(ERROR, CLOSE, { duration: 5000 }); }
  }

  onNoClick() {
    this.dialogRef.close({ ok: false });
  }
}
