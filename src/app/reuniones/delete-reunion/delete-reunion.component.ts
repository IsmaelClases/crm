import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Reunion } from 'src/app/shared/interfaces/reunion';
import { ReunionesService } from 'src/app/services/reuniones.service';
import { CLOSE, ENTIDAD_REUNION } from '../../shared/messages';

@Component({
  selector: 'app-delete-reunion',
  templateUrl: './delete-reunion.component.html',
  styleUrls: ['./delete-reunion.component.scss']
})
export class DeleteReunionComponent implements OnInit {

  ENTIDAD: String;

  constructor(
    public dialogRef: MatDialogRef<DeleteReunionComponent>,
    @Inject(MAT_DIALOG_DATA) public reunion: Reunion,
    public servicioReunion: ReunionesService,
    public snackBar: MatSnackBar,
  ) 
  {   }

  ngOnInit(): void {   
    this.ENTIDAD = ENTIDAD_REUNION;
  }

  onNoClick(): void {
    this.dialogRef.close({ ok: false });
  }

  async confirmDelete() {
    const RESPONSE = await this.servicioReunion.deleteReunion(this.reunion.id_reunion).toPromise();
    if (RESPONSE.ok) {
      this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
      this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
    } else { this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 }); }
  }

}
