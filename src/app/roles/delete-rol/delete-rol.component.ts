import { Component, OnInit, Inject } from '@angular/core';
import { RolesService } from 'src/app/services/roles.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Rol } from 'src/app/shared/interfaces/rol';
import { CLOSE } from '../../shared/messages';

@Component({
  selector: 'app-delete-rol',
  templateUrl: './delete-rol.component.html',
  styleUrls: ['./delete-rol.component.scss']
})
export class DeleteRolComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteRolComponent>,
              @Inject(MAT_DIALOG_DATA) public rol: Rol,
              public servicioRoles: RolesService,
              private snackBar: MatSnackBar
  ) { }

  ngOnInit() { }

  onNoClick(): void {
    this.dialogRef.close({ok: false});
  }

  async confirmDelete() {
    const RESP = await this.servicioRoles.deleteRol(this.rol.id_rol).toPromise();
    if (RESP.ok) {
      this.snackBar.open(RESP.message, CLOSE, { duration: 5000 });
      this.dialogRef.close({ok: RESP.ok, data: RESP.data});
    } else {
      this.snackBar.open(RESP.message, CLOSE, { duration: 5000 });
    }
  }
}
