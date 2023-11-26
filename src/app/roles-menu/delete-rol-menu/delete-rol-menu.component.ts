import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RolMenuService } from 'src/app/services/rol-menu.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RolMenu } from 'src/app/shared/interfaces/rol-menu';
import { CLOSE } from '../../shared/messages';

@Component({
  selector: 'app-delete-rol-menu',
  templateUrl: './delete-rol-menu.component.html',
  styleUrls: ['./delete-rol-menu.component.scss']
})
export class DeleteRolMenuComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteRolMenuComponent>,
              private servicioRolMenu: RolMenuService,
              @Inject(MAT_DIALOG_DATA) public rolMenu: RolMenu,
              private snackBar: MatSnackBar
  ) { }

  ngOnInit() {}

  async deleteRolMenu() {
    const RESPONSE = await this.servicioRolMenu.deleteRolMenu(this.rolMenu.id_rol_menu).toPromise();
    if (RESPONSE.ok) {
      this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
      this.dialogRef.close({ok: RESPONSE.ok, data: RESPONSE.data});
    } else {
      this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
    }
  }

  onNoClick() {
    this.dialogRef.close({ok: false});
  }
}
