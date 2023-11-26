import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/shared/interfaces/usuario';
import { CLOSE } from '../../shared/messages';

@Component({
  selector: 'app-delete-usuario',
  templateUrl: './delete-usuario.component.html',
  styleUrls: ['./delete-usuario.component.scss']
})
export class DeleteUsuarioComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteUsuarioComponent>,
              @Inject(MAT_DIALOG_DATA) public usuario: Usuario,
              private servicioUsuario: UsuarioService,
              private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  async deleteUser() {
    const RESP = await this.servicioUsuario.deleteUsuario(this.usuario).toPromise();
    if (RESP.ok) {
      this.snackBar.open(RESP.message, CLOSE, { duration: 5000 });
      this.dialogRef.close({ok: RESP.ok, data: RESP.data});
    } else {
      this.snackBar.open(RESP.message, CLOSE, { duration: 5000 });
    }
  }

  onNoClick() {
    this.dialogRef.close({ok: false});
  }

}
