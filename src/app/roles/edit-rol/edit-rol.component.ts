import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddRolComponent } from '../add-rol/add-rol.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RolesService } from 'src/app/services/roles.service';
import { Rol } from 'src/app/shared/interfaces/rol';
import { INVALID_FORM, CLOSE } from '../../shared/messages';

@Component({
  selector: 'app-edit-rol',
  templateUrl: './edit-rol.component.html',
  styleUrls: ['./edit-rol.component.scss']
})
export class EditRolComponent implements OnInit {

  rolForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddRolComponent>,
              private snackBar: MatSnackBar,
              private servicioRoles: RolesService,
              @Inject(MAT_DIALOG_DATA) public rol: Rol
  ) {

  }

  ngOnInit() {
    this.rolForm = new FormGroup({
      id_rol: new FormControl(this.rol.id_rol, Validators.required),
      rol: new FormControl(this.rol.rol, Validators.required),
      observaciones: new FormControl(this.rol.observaciones)
    });
  }

  async confirmAdd() {
    if (this.rolForm.valid) {
      const rol = this.rolForm.value;

      const RESP = await this.servicioRoles.editRol(rol).toPromise();
      if (RESP.ok) {
        this.snackBar.open(RESP.message, CLOSE, { duration: 5000 });
        this.dialogRef.close({ok: RESP.ok, data: RESP.data});
      } else {
        this.snackBar.open(RESP.message, CLOSE, { duration: 5000 });
      }
    } else {
      this.snackBar.open(INVALID_FORM, CLOSE, { duration: 5000 });
    }
  }

  onNoClick() {
    this.dialogRef.close({ok: false});
  }
}
