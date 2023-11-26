import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GruposService } from 'src/app/services/grupos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Grupo } from 'src/app/shared/interfaces/grupo';

@Component({
  selector: 'app-delete-grupo',
  templateUrl: './delete-grupo.component.html',
  styleUrls: ['./delete-grupo.component.scss']
})
export class DeleteGrupoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteGrupoComponent>,
              @Inject(MAT_DIALOG_DATA) public grupo: Grupo,
              public servicioGrupos: GruposService,
              public snackBar: MatSnackBar
  ) { }

  ngOnInit() { }

  onNoClick(): void {
    this.dialogRef.close({ok: false});
  }

  async confirmDelete() {
    const RESPONSE = await this.servicioGrupos.deleteGrupo(this.grupo.id_grupo_menu).toPromise();
    if (RESPONSE.ok) {
      this.snackBar.open('Grupo eliminado con éxito', 'Cerrar', { duration: 5000 });
      this.dialogRef.close({ok: RESPONSE.ok, data: RESPONSE.data});
    } else {
      this.snackBar.open('Ocurrió un fallo', 'Cerrar', { duration: 5000 });
    }
  }

}
