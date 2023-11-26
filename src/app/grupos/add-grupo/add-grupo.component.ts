import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GruposService } from 'src/app/services/grupos.service';
import { Grupo } from 'src/app/shared/interfaces/grupo';
import { CLOSE, INVALID_FORM } from '../../shared/messages';

@Component({
  selector: 'app-add-grupo',
  templateUrl: './add-grupo.component.html',
  styleUrls: ['./add-grupo.component.scss']
})
export class AddGrupoComponent implements OnInit {

  grupoForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddGrupoComponent>,
              private snackBar: MatSnackBar,
              private servicioGrupos: GruposService
  ) {

  }

  ngOnInit() {
    this.grupoForm = new FormGroup({
      grupo: new FormControl(null, Validators.required),
      orden: new FormControl(null, Validators.required),
      observaciones: new FormControl(null)
    });
  }

  async confirmAdd() {
    if (this.grupoForm.valid) {
      const grupo = this.grupoForm.value as Grupo;

      const RESPONSE = await this.servicioGrupos.addGrupo(grupo).toPromise();
      if (RESPONSE.ok) {
        this.snackBar.open('Grupo creado con éxito', 'Cerrar', { duration: 5000 });
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
