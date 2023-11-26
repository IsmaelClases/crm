import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MotivoReunion } from 'src/app/shared/interfaces/motivo-reunion';
import { MotivosReunionService } from 'src/app/services/motivos-reunion.service';
import { CLOSE, ENTIDAD_MOTIVO_REUNION } from '../../shared/messages';

@Component({
  selector: 'app-delete-motivo-reunion',
  templateUrl: './delete-motivo-reunion.component.html',
  styleUrls: ['./delete-motivo-reunion.component.scss']
})
export class DeleteMotivoReunionComponent implements OnInit {

  ENTIDAD: String;

  constructor(
    public dialogRef: MatDialogRef<DeleteMotivoReunionComponent>,
    @Inject(MAT_DIALOG_DATA) public motivoReunion: MotivoReunion,
    public servicioMotivoReunion: MotivosReunionService,
    public snackBar: MatSnackBar,
  ) 
  {   }

  ngOnInit(): void {   
    this.ENTIDAD = ENTIDAD_MOTIVO_REUNION;
  }

  onNoClick(): void {
    this.dialogRef.close({ ok: false });
  }

  async confirmDelete() {
    const RESPONSE = await this.servicioMotivoReunion.deleteMotivoReunion(this.motivoReunion.id_motivo_reunion).toPromise();
    if (RESPONSE.ok) {
      this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
      this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
    } else { this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 }); }
  }

}
