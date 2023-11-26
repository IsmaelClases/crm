import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RolesService } from 'src/app/services/roles.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/shared/interfaces/usuario';
import { Rol } from 'src/app/shared/interfaces/rol';
import {CLOSE, INVALID_FORM} from '../../shared/messages';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.scss']
})
export class EditUsuarioComponent implements OnInit {

  usuarioForm: FormGroup;
  roles: Rol[];

  constructor(public dialogRef: MatDialogRef<EditUsuarioComponent>,
              private servicioRoles: RolesService,
              private servicioUsuario: UsuarioService,
              public snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public usuario: Usuario
  ) { }

  ngOnInit() {

    this.usuarioForm = new FormGroup({
      id_usuario: new FormControl(this.usuario.id_usuario, [Validators.required]),
      usuario: new FormControl(this.usuario.usuario, [Validators.required, Validators.email]),
      nombre_publico: new FormControl(this.usuario.nombre_publico),
      password: new FormControl(''),
      habilitado: new FormControl(Number(this.usuario.habilitado) === 1, [Validators.required]),
      id_rol: new FormControl(this.usuario.id_rol, [Validators.required]),
      observaciones: new FormControl(this.usuario.observaciones)
    });

    this.getRoles();
  }

  async getRoles() {
    const RESPONSE = await this.servicioRoles.getAllRoles().toPromise();
    if (RESPONSE.ok) {
      this.roles = RESPONSE.data as Rol[];
    }
  }

  async confirmAdd() {
    if (this.usuarioForm.valid) {
      const usuario = this.usuarioForm.value;

      const RESP = await this.servicioUsuario.editUsuario(usuario).toPromise();
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

  onNoClick(): void {
    this.dialogRef.close({ok: false});
  }

}
