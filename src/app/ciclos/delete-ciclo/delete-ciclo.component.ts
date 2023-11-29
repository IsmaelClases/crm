import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Ciclo } from 'src/app/shared/interfaces/ciclo';
import { CiclosService } from 'src/app/services/ciclos.service';
import { CLOSE, ENTIDAD_CONTACTO } from '../../shared/messages';

@Component({
  selector: 'app-delete-ciclo',
  templateUrl: './delete-ciclo.component.html',
  styleUrls: ['./delete-ciclo.component.scss']
})
export class DeleteCicloComponent implements OnInit {

  ENTIDAD: String;

  constructor(
    public dialogRef: MatDialogRef<DeleteCicloComponent>,
    @Inject(MAT_DIALOG_DATA) public ciclo: Ciclo,
    public servicioCiclo: CiclosService,
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
    const RESPONSE = await this.servicioCiclo.deleteCiclo(this.ciclo.id_ciclo).toPromise();
    if (RESPONSE.ok) {
      this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
      this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
    } else { this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 }); }
  }

}
