import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RolesService } from 'src/app/services/roles.service';
import { Rol } from 'src/app/shared/interfaces/rol';
import { INVALID_FORM, CLOSE } from '../../shared/messages';

@Component({
  selector: 'app-add-rol',
  templateUrl: './add-rol.component.html',
  styleUrls: ['./add-rol.component.scss']
})
export class AddRolComponent implements OnInit {

  rolForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddRolComponent>,
              private snackBar: MatSnackBar,
              private servicioRoles: RolesService
  ) {

  }

  ngOnInit() {
    this.rolForm = new FormGroup({
      rol: new FormControl(null, Validators.required),
      observaciones: new FormControl(null)
    });
  }

  async confirmAdd() {
    if (this.rolForm.valid) {
      const rol = this.rolForm.value as Rol;

      const RESP = await this.servicioRoles.addRol(rol).toPromise();
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
