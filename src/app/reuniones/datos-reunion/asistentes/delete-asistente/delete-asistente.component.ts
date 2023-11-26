import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Asistente } from 'src/app/shared/interfaces/asistente';
import { AsistentesService } from 'src/app/services/asistentes.service';
import { CLOSE, ENTIDAD_ASISTENTE } from 'src/app/shared/messages';

@Component({
  selector: 'app-delete-asistente',
  templateUrl: './delete-asistente.component.html',
  styleUrls: ['./delete-asistente.component.scss']
})
export class DeleteAsistenteComponent implements OnInit {

  ENTIDAD: String;

  constructor(
    public dialogRef: MatDialogRef<DeleteAsistenteComponent>,
    @Inject(MAT_DIALOG_DATA) public asistente: Asistente,
    public servicioAsistente: AsistentesService,
    public snackBar: MatSnackBar,
  ) 
  {   }

  ngOnInit(): void {   
    this.ENTIDAD = ENTIDAD_ASISTENTE;
  }

  onNoClick(): void {
    this.dialogRef.close({ ok: false });
  }

  async confirmDelete() {
    const RESPONSE = await this.servicioAsistente.deleteAsistente(this.asistente.id_asistente).toPromise();
    if (RESPONSE.ok) {
      this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
      this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
    } else { this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 }); }
  }

}
