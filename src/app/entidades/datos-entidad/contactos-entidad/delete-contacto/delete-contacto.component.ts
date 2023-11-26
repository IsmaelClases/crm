import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Contacto } from 'src/app/shared/interfaces/contacto';
import { ContactosService } from 'src/app/services/contactos.service';
import { CLOSE, ENTIDAD_CONTACTO } from 'src/app/shared/messages';

@Component({
  selector: 'app-delete-contacto',
  templateUrl: './delete-contacto.component.html',
  styleUrls: ['./delete-contacto.component.scss']
})
export class DeleteContactoComponent implements OnInit {

  ENTIDAD: String;

  constructor(
    public dialogRef: MatDialogRef<DeleteContactoComponent>,
    @Inject(MAT_DIALOG_DATA) public contacto: Contacto,
    public servicioContacto: ContactosService,
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
    const RESPONSE = await this.servicioContacto.deleteContacto(this.contacto.id_contacto).toPromise();
    if (RESPONSE.ok) {
      this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
      this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
    } else { this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 }); }
  }

}
