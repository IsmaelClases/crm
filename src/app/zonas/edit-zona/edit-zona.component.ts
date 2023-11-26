import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ZonasService } from 'src/app/services/zonas.service';
import { Zona } from 'src/app/shared/interfaces/zona';
import { CLOSE, ENTIDAD_ZONA, ERROR } from '../../shared/messages';


@Component({
  selector: 'app-edit-zona',
  templateUrl: './edit-zona.component.html',
  styleUrls: ['./edit-zona.component.scss']
})
export class EditZonaComponent implements OnInit {

  zonaForm: FormGroup;
  ENTIDAD: String;

  constructor(
    public dialogRef: MatDialogRef<EditZonaComponent>,
    private snackBar: MatSnackBar,
    private servicioZonas: ZonasService,
    @Inject(MAT_DIALOG_DATA) public zona: Zona
  ) { }

  ngOnInit(): void {
    this.ENTIDAD = ENTIDAD_ZONA;
    this.zonaForm = new FormGroup({
      id_zona: new FormControl(this.zona.id_zona, Validators.required),
      zona: new FormControl(this.zona.zona, Validators.required),
      observaciones: new FormControl(this.zona.observaciones)
    });
  }

  async confirmEdit(){
    if (this.zonaForm.valid) {
      const zonaForm = this.zonaForm.value;

      const RESPONSE = await this.servicioZonas.editZona(zonaForm).toPromise();
      if (RESPONSE.ok) {
        this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
        this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
      } else { this.snackBar.open(ERROR, CLOSE, { duration: 5000 }); }
    } else { this.snackBar.open(ERROR, CLOSE, { duration: 5000 }); }
  }

  onNoClick() {
    this.dialogRef.close({ ok: false });
  }
}
