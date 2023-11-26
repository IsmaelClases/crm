import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Zona } from 'src/app/shared/interfaces/zona';
import { ZonasService } from 'src/app/services/zonas.service';
import { CLOSE, INVALID_FORM, ENTIDAD_ZONA } from '../../shared/messages';

@Component({
  selector: 'app-add-zona',
  templateUrl: './add-zona.component.html',
  styleUrls: ['./add-zona.component.scss']
})
export class AddZonaComponent implements OnInit {
  zonaForm: FormGroup;

  ENTIDAD: String;

  constructor(public dialogRef: MatDialogRef<AddZonaComponent>,
    private snackBar: MatSnackBar,
    private servicioZonas: ZonasService
  ){ }

  ngOnInit(): void {
    this.zonaForm = new FormGroup({
      zona: new FormControl(null, Validators.required),
      observaciones: new FormControl(null)
    });
    this.ENTIDAD = ENTIDAD_ZONA;
  }

  async confirmAdd() {
    if (this.zonaForm.valid) {
      const zona = this.zonaForm.value as Zona;

      const RESPONSE = await this.servicioZonas.addZona(zona).toPromise();
      if (RESPONSE.ok) {
        this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
        this.dialogRef.close({ok: RESPONSE.ok, data: RESPONSE.data});
      } else {
        this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
      }
    } else {
      this.snackBar.open(INVALID_FORM, CLOSE, { duration: 5000 });
    }
  }

  onNoClick() {
    this.dialogRef.close({ok: false});
  }  
}
