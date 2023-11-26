import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModoReunion } from 'src/app/shared/interfaces/modo-reunion';
import { ModosReunionService } from 'src/app/services/modos-reunion.service';
import { CLOSE, INVALID_FORM, ENTIDAD_MODO_REUNION } from '../../shared/messages';

@Component({
  selector: 'app-add-modo-reunion',
  templateUrl: './add-modo-reunion.component.html',
  styleUrls: ['./add-modo-reunion.component.scss']
})
export class AddModoReunionComponent implements OnInit {
  modoReunionForm: FormGroup;

  ENTIDAD: String;

  constructor(public dialogRef: MatDialogRef<AddModoReunionComponent>,
    private snackBar: MatSnackBar,
    private servicioModosReunion: ModosReunionService
  ){ }

  ngOnInit(): void {
    this.modoReunionForm = new FormGroup({
      modo_reunion: new FormControl(null, Validators.required),
      observaciones: new FormControl(null)
    });
    this.ENTIDAD = ENTIDAD_MODO_REUNION;
  }

  async confirmAdd() {
    if (this.modoReunionForm.valid) {
      const modo_reunion = this.modoReunionForm.value as ModoReunion;

      const RESPONSE = await this.servicioModosReunion.addModoReunion(modo_reunion).toPromise();
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
