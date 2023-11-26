import { Component, OnInit } from '@angular/core';
import { RolMenuService } from 'src/app/services/rol-menu.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GruposService } from 'src/app/services/grupos.service';
import { OpcionesService } from 'src/app/services/opciones.service';
import { RolesService } from 'src/app/services/roles.service';
import { Rol } from 'src/app/shared/interfaces/rol';
import { Grupo } from 'src/app/shared/interfaces/grupo';
import { Opcion } from 'src/app/shared/interfaces/opcion';
import { CLOSE, INVALID_FORM } from '../../shared/messages';

@Component({
  selector: 'app-add-rol-menu',
  templateUrl: './add-rol-menu.component.html',
  styleUrls: ['./add-rol-menu.component.scss']
})
export class AddRolMenuComponent implements OnInit {

  rolMenuForm: FormGroup;
  roles: Rol[];
  grupos: Grupo[];
  opciones: Opcion[];

  permises = {
    add: false,
    edit: false,
    delete: false,
  };

  constructor(public dialogRef: MatDialogRef<AddRolMenuComponent>,
              private snackBar: MatSnackBar,
              private servicioGrupos: GruposService,
              private servicioOpciones: OpcionesService,
              private servicioRoles: RolesService,
              private servicioRolMenu: RolMenuService
    ) {

  }

  ngOnInit() {
    this.rolMenuForm = new FormGroup({
      id_rol: new FormControl(null, [Validators.required]),
      id_grupo: new FormControl(null, [Validators.required]),
      id_opcion: new FormControl(null, [Validators.required]),
      add: new FormControl(this.permises.add, [Validators.required]),
      edit: new FormControl(this.permises.edit, [Validators.required]),
      delete: new FormControl(this.permises.delete, [Validators.required]),
      observaciones: new FormControl(null)
    });
    this.getRoles();
    this.getGrupos();
    this.getOpciones();
  }

  async getRoles() {
    const RESPONSE = await this.servicioRoles.getAllRoles().toPromise();
    if (RESPONSE.ok) {
      this.roles = RESPONSE.data as Rol[];
    }
  }

  async getGrupos() {
    const RESPONSE = await this.servicioGrupos.getAllGrupos().toPromise();
    if (RESPONSE.ok) {
      this.grupos = RESPONSE.data as Grupo[];
    }
  }

  async getOpciones() {
    const RESPONSE = await this.servicioOpciones.getAllOpciones().toPromise();
    if (RESPONSE.ok) {
      this.opciones = RESPONSE.data as Opcion[];
    }
  }

  selectRol(idRol: string) {
    const idRolSuperadmin = this.roles.filter(rol => {
      return rol.rol === 'Superadmin';
    })[0].id_rol;

    if (Number(idRol) === Number(idRolSuperadmin)) {
      this.permises.add = this.rolMenuForm.controls.add.value;
      this.permises.edit = this.rolMenuForm.controls.edit.value;
      this.permises.delete = this.rolMenuForm.controls.delete.value;

      this.rolMenuForm.controls.add.setValue(true);
      this.rolMenuForm.controls.edit.setValue(true);
      this.rolMenuForm.controls.delete.setValue(true);
    } else {
      this.rolMenuForm.controls.add.setValue(this.permises.add);
      this.rolMenuForm.controls.edit.setValue(this.permises.edit);
      this.rolMenuForm.controls.delete.setValue(this.permises.delete);
    }
  }

  async confirmAdd() {
    if (this.rolMenuForm.valid) {
      const rolMenu = this.rolMenuForm.value;
      const RESPONSE = await this.servicioRolMenu.addRolMenu(rolMenu).toPromise();
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
