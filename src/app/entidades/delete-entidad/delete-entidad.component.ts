import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Entidad } from 'src/app/shared/interfaces/entidad';
import { EntidadesService } from 'src/app/services/entidades.service';
import { CLOSE, ENTIDAD_ENTIDAD } from '../../shared/messages';

@Component({
  selector: 'app-delete-entidad',
  templateUrl: './delete-entidad.component.html',
  styleUrls: ['./delete-entidad.component.scss']
})
export class DeleteEntidadComponent implements OnInit {

  ENTIDAD: String;

  constructor(
    public dialogRef: MatDialogRef<DeleteEntidadComponent>,
    @Inject(MAT_DIALOG_DATA) public entidad: Entidad,
    public servicioEntidad: EntidadesService,
    public snackBar: MatSnackBar,
  ) 
  {   }

  ngOnInit(): void {   
    this.ENTIDAD = ENTIDAD_ENTIDAD;
  }

  onNoClick(): void {
    this.dialogRef.close({ ok: false });
  }

  async confirmDelete() {
    const RESPONSE = await this.servicioEntidad.deleteEntidad(this.entidad.id_entidad).toPromise();
    if (RESPONSE.ok) {
      this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
      this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
    } else { this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 }); }
  }

}
