import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipoEntidad } from 'src/app/shared/interfaces/tipo-entidad';
import { TiposEntidadService } from 'src/app/services/tipos-entidad.service';
import { CLOSE, ENTIDAD_TIPO_ENTIDAD } from '../../shared/messages';

@Component({
  selector: 'app-delete-tipo-entidad',
  templateUrl: './delete-tipo-entidad.component.html',
  styleUrls: ['./delete-tipo-entidad.component.scss']
})
export class DeleteTipoEntidadComponent implements OnInit {

  ENTIDAD: String;

  constructor(
    public dialogRef: MatDialogRef<DeleteTipoEntidadComponent>,
    @Inject(MAT_DIALOG_DATA) public tipoEntidad: TipoEntidad,
    public servicioTipoEntidad: TiposEntidadService,
    public snackBar: MatSnackBar,
  ) 
  {   }

  ngOnInit(): void {   
    this.ENTIDAD = ENTIDAD_TIPO_ENTIDAD;
  }

  onNoClick(): void {
    this.dialogRef.close({ ok: false });
  }

  async confirmDelete() {
    const RESPONSE = await this.servicioTipoEntidad.deleteTipoEntidad(this.tipoEntidad.id_tipo_entidad).toPromise();
    if (RESPONSE.ok) {
      this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
      this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
    } else { this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 }); }
  }

}
