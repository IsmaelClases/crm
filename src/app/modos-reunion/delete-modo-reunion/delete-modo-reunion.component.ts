import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModoReunion } from 'src/app/shared/interfaces/modo-reunion';
import { ModosReunionService } from 'src/app/services/modos-reunion.service';
import { CLOSE, ENTIDAD_MODO_REUNION } from '../../shared/messages';

@Component({
  selector: 'app-delete-modo-reunion',
  templateUrl: './delete-modo-reunion.component.html',
  styleUrls: ['./delete-modo-reunion.component.scss']
})
export class DeleteModoReunionComponent implements OnInit {

  ENTIDAD: String;

  constructor(
    public dialogRef: MatDialogRef<DeleteModoReunionComponent>,
    @Inject(MAT_DIALOG_DATA) public modoReunion: ModoReunion,
    public servicioModoReunion: ModosReunionService,
    public snackBar: MatSnackBar,
  ) 
  {   }

  ngOnInit(): void {   
    this.ENTIDAD = ENTIDAD_MODO_REUNION;
  }

  onNoClick(): void {
    this.dialogRef.close({ ok: false });
  }

  async confirmDelete() {
    const RESPONSE = await this.servicioModoReunion.deleteModoReunion(this.modoReunion.id_modo_reunion).toPromise();
    if (RESPONSE.ok) {
      this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
      this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
    } else { this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 }); }
  }

}
