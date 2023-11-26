import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {CLOSE, INVALID_FORM} from '../shared/messages';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  perfilForm: FormGroup;

  constructor(
              private snackBar: MatSnackBar,
              private usuarioService: UsuarioService
              ) { }

  ngOnInit() {
    // console.log(localStorage.getItem('nombre_publico'));
    this.perfilForm = new FormGroup({
      // query: new FormControl('perfil'),
      correoUsuario: new FormControl(localStorage.getItem('usuario')),
      nombrePublico: new FormControl(localStorage.getItem('nombre_publico')),
      nuevaPassword: new FormControl(''),
      confirmarNuevaPassword: new FormControl('')
    }, this.passMatchValidator);
  }

  passMatchValidator(g: FormGroup) {
    return g.get('nuevaPassword').value === g.get('confirmarNuevaPassword').value
      ? null : { mismatch: true };
  }

  async actualizarPerfil() {

    if (this.perfilForm.valid) {
      const RESP = await this.usuarioService.editUsuario(this.perfilForm.value , 'profile').toPromise();
      if (RESP.ok) {
        this.snackBar.open(RESP.message, CLOSE, { duration: 5000 });
      } else {
        this.snackBar.open(RESP.message, CLOSE, { duration: 5000 });
      }
    } else {
      this.snackBar.open(INVALID_FORM, CLOSE, { duration: 5000 });
    }
  }
}
