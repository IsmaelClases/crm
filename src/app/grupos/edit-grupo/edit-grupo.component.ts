import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GruposService } from 'src/app/services/grupos.service';
import { Grupo } from 'src/app/shared/interfaces/grupo';

@Component({
  selector: 'app-edit-grupo',
  templateUrl: './edit-grupo.component.html',
  styleUrls: ['./edit-grupo.component.scss']
})
export class EditGrupoComponent implements OnInit {

  grupoForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<EditGrupoComponent>,
              private snackBar: MatSnackBar,
              private servicioGrupos: GruposService,
              @Inject(MAT_DIALOG_DATA) public grupo: Grupo
  ) {

  }

  ngOnInit() {
    this.grupoForm = new FormGroup({
      id_grupo_menu: new FormControl(this.grupo.id_grupo_menu, Validators.required),
      grupo: new FormControl(this.grupo.grupo, Validators.required),
      orden: new FormControl(this.grupo.orden, Validators.required),
      observaciones: new FormControl(this.grupo.observaciones)
    });
  }

  async confirmAdd() {
    if (this.grupoForm.valid) {
      const grupo = this.grupoForm.value;

      const RESPONSE = await this.servicioGrupos.editGrupo(grupo).toPromise();
      if (RESPONSE.ok) {
        this.snackBar.open('Grupo editado con éxito', 'Cerrar', { duration: 5000 });
        this.dialogRef.close({ok: RESPONSE.ok, data: RESPONSE.data});
      } else {
        this.snackBar.open('Ocurrió un fallo', 'Cerrar', { duration: 5000 });
      }
    } else {
      this.snackBar.open('Ocurrió un fallo', 'Cerrar', { duration: 5000 });
    }
  }

  onNoClick() {
    this.dialogRef.close({ok: false});
  }
}
