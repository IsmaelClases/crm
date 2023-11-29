import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Unidad } from 'src/app/shared/interfaces/unidad';
import { UnidadesService } from 'src/app/services/unidades.service';
import { CLOSE, ENTIDAD_CONTACTO } from 'src/app/shared/messages';

@Component({
  selector: 'app-delete-unidad',
  templateUrl: './delete-unidad.component.html',
  styleUrls: ['./delete-unidad.component.scss']
})
export class DeleteUnidadComponent implements OnInit {

  ENTIDAD: String;

  constructor(
    public dialogRef: MatDialogRef<DeleteUnidadComponent>,
    @Inject(MAT_DIALOG_DATA) public unidad: Unidad,
    public servicioUnidad: UnidadesService,
    public snackBar: MatSnackBar,
  ) 
  {   }

  ngOnInit(): void {   
    this.ENTIDAD = ENTIDAD_CONTACTO;
  }

  onNoClick(): void {
    this.dialogRef.close({ ok: false });
  }

  async confirmDelete() {
    const RESPONSE = await this.servicioUnidad.deleteUnidad(this.unidad.id_unidad).toPromise();
    if (RESPONSE.ok) {
      this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
      this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
    } else { this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 }); }
  }

}
