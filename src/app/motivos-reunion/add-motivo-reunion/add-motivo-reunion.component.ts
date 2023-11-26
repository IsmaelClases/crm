import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MotivoReunion } from 'src/app/shared/interfaces/motivo-reunion';
import { MotivosReunionService } from 'src/app/services/motivos-reunion.service';
import { CLOSE, INVALID_FORM, ENTIDAD_MOTIVO_REUNION } from '../../shared/messages';

@Component({
  selector: 'app-add-motivo-reunion',
  templateUrl: './add-motivo-reunion.component.html',
  styleUrls: ['./add-motivo-reunion.component.scss']
})
export class AddMotivoReunionComponent implements OnInit {
  motivoReunionForm: FormGroup;

  ENTIDAD: String;

  constructor(public dialogRef: MatDialogRef<AddMotivoReunionComponent>,
    private snackBar: MatSnackBar,
    private servicioMotivosReunion: MotivosReunionService
  ){ }

  ngOnInit(): void {
    this.motivoReunionForm = new FormGroup({
      motivo_reunion: new FormControl(null, Validators.required),
      observaciones: new FormControl(null)
    });
    this.ENTIDAD = ENTIDAD_MOTIVO_REUNION;
  }

  async confirmAdd() {
    if (this.motivoReunionForm.valid) {
      const motivo_reunion = this.motivoReunionForm.value as MotivoReunion;

      const RESPONSE = await this.servicioMotivosReunion.addMotivoReunion(motivo_reunion).toPromise();
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
