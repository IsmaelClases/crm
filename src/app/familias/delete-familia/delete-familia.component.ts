import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Familia } from 'src/app/shared/interfaces/familia';
import { FamiliasService } from 'src/app/services/familias.service';
import { CLOSE, ENTIDAD_FAMILIA } from '../../shared/messages';

@Component({
  selector: 'app-delete-familia',
  templateUrl: './delete-familia.component.html',
  styleUrls: ['./delete-familia.component.scss']
})
export class DeleteFamiliaComponent implements OnInit {

  ENTIDAD: String;

  constructor(
    public dialogRef: MatDialogRef<DeleteFamiliaComponent>,
    @Inject(MAT_DIALOG_DATA) public familia: Familia,
    public servicioFamilia: FamiliasService,
    public snackBar: MatSnackBar,
  ) 
  {   }

  ngOnInit(): void {   
    this.ENTIDAD = ENTIDAD_FAMILIA;
  }

  onNoClick(): void {
    this.dialogRef.close({ ok: false });
  }

  async confirmDelete() {
    const RESPONSE = await this.servicioFamilia.deleteFamilia(this.familia.id_familia).toPromise();
    if (RESPONSE.ok) {
      this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
      this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
    } else { this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 }); }
  }

}
