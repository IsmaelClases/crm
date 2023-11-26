import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Zona } from 'src/app/shared/interfaces/zona';
import { ZonasService } from 'src/app/services/zonas.service';
import { CLOSE, ENTIDAD_ZONA } from '../../shared/messages';

@Component({
  selector: 'app-delete-zona',
  templateUrl: './delete-zona.component.html',
  styleUrls: ['./delete-zona.component.scss']
})
export class DeleteZonaComponent implements OnInit {

  ENTIDAD: String;

  constructor(
    public dialogRef: MatDialogRef<DeleteZonaComponent>,
    @Inject(MAT_DIALOG_DATA) public zona: Zona,
    public servicioZona: ZonasService,
    public snackBar: MatSnackBar,
  ) 
  {   }

  ngOnInit(): void {   
    this.ENTIDAD = ENTIDAD_ZONA;
  }

  onNoClick(): void {
    this.dialogRef.close({ ok: false });
  }

  async confirmDelete() {
    const RESPONSE = await this.servicioZona.deleteZona(this.zona.id_zona).toPromise();
    if (RESPONSE.ok) {
      this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
      this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
    } else { this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 }); }
  }

}
