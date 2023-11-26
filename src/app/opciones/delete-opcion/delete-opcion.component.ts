import { Component, OnInit, Inject } from '@angular/core';
import { OpcionesService } from 'src/app/services/opciones.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { Opcion } from 'src/app/shared/interfaces/opcion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Opcion } from 'src/app/shared/interfaces/opcion';
import { CLOSE } from '../../shared/messages';

@Component({
  selector: 'app-delete-opcion',
  templateUrl: './delete-opcion.component.html',
  styleUrls: ['./delete-opcion.component.scss']
})
export class DeleteOpcionComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteOpcionComponent>,
              @Inject(MAT_DIALOG_DATA) public opcion: Opcion,
              public servicioOpciones: OpcionesService,
              private snackBar: MatSnackBar
  ) { }

  ngOnInit() { }

  onNoClick(): void {
    this.dialogRef.close({ok: false});
  }

  async confirmDelete() {
    const RESPONSE = await this.servicioOpciones.deleteOpcion(this.opcion.id_opcion_menu).toPromise();
    if (RESPONSE.ok) {
      this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
      this.dialogRef.close({ok: RESPONSE.ok, data: RESPONSE.data});
    } else {
      this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
    }
  }

}
