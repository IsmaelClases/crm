import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GruposService } from 'src/app/services/grupos.service';
import { OpcionesService } from 'src/app/services/opciones.service';
import { RolesService } from 'src/app/services/roles.service';
import { RolMenuService } from 'src/app/services/rol-menu.service';
import { RolMenu } from 'src/app/shared/interfaces/rol-menu';
import { Opcion } from 'src/app/shared/interfaces/opcion';
import { Grupo } from 'src/app/shared/interfaces/grupo';
import { Rol } from 'src/app/shared/interfaces/rol';
import { CLOSE, INVALID_FORM } from '../../shared/messages';

@Component({
  selector: 'app-edit-rol-menu',
  templateUrl: './edit-rol-menu.component.html',
  styleUrls: ['./edit-rol-menu.component.scss']
})
export class EditRolMenuComponent implements OnInit {

  rolMenuForm: FormGroup;
  roles: Rol[];
  grupos: Grupo[];
  opciones: Opcion[];

  constructor(public dialogRef: MatDialogRef<EditRolMenuComponent>,
              private snackBar: MatSnackBar,
              private servicioGrupos: GruposService,
              private servicioOpciones: OpcionesService,
              private servicioRoles: RolesService,
              private servicioRolMenu: RolMenuService,
              @Inject(MAT_DIALOG_DATA) public rolMenu: RolMenu
  ) {

  }

  ngOnInit() {
    this.rolMenuForm = new FormGroup({
      id_rol_menu: new FormControl(this.rolMenu.id_rol_menu, [Validators.required]),
      id_rol: new FormControl(this.rolMenu.id_rol, [Validators.required]),
      id_grupo: new FormControl(this.rolMenu.id_grupo_menu, [Validators.required]),
      id_opcion: new FormControl(this.rolMenu.id_opcion_menu, [Validators.required]),
      add: new FormControl(this.rolMenu.permiso_post === '1', [Validators.required]),
      edit: new FormControl(this.rolMenu.permiso_put === '1', [Validators.required]),
      delete: new FormControl(this.rolMenu.permiso_delete === '1', [Validators.required]),
      observaciones: new FormControl(this.rolMenu.observaciones)
    });
    this.getRoles();
    this.getGrupos();
    this.getOpciones();
  }

  async getRoles() {
    const REPSONSE = await this.servicioRoles.getAllRoles().toPromise();
    if (REPSONSE.ok) {
      this.roles = REPSONSE.data as Rol[];
    }
  }

  async getGrupos() {
    const REPSONSE = await this.servicioGrupos.getAllGrupos().toPromise();
    if (REPSONSE.ok) {
      this.grupos = REPSONSE.data as Grupo[];
    }
  }

  async getOpciones() {
    const REPSONSE = await this.servicioOpciones.getAllOpciones().toPromise();
    if (REPSONSE.ok) {
      this.opciones = REPSONSE.data as Opcion[];
    }
  }

  async confirmAdd() {
    if (this.rolMenuForm.valid) {
      const rolMenu = this.rolMenuForm.value;
      const RESPONSE = await this.servicioRolMenu.editRolMenu(rolMenu).toPromise();
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
