import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MotivosReunionService } from 'src/app/services/motivos-reunion.service';
import { MotivoReunion } from 'src/app/shared/interfaces/motivo-reunion';
import { CLOSE, ENTIDAD_MOTIVO_REUNION, ERROR } from '../../shared/messages';


@Component({
  selector: 'app-edit-motivo-reunion',
  templateUrl: './edit-motivo-reunion.component.html',
  styleUrls: ['./edit-motivo-reunion.component.scss']
})
export class EditMotivoReunionComponent implements OnInit {

  motivoReunionForm: FormGroup;
  ENTIDAD: String;

  constructor(
    public dialogRef: MatDialogRef<EditMotivoReunionComponent>,
    private snackBar: MatSnackBar,
    private servicioMotivosReunion: MotivosReunionService,
    @Inject(MAT_DIALOG_DATA) public motivoReunion: MotivoReunion
  ) { }

  ngOnInit(): void {
    this.ENTIDAD = ENTIDAD_MOTIVO_REUNION;
    this.motivoReunionForm = new FormGroup({
      id_motivo_reunion: new FormControl(this.motivoReunion.id_motivo_reunion, Validators.required),
      motivo_reunion: new FormControl(this.motivoReunion.motivo_reunion, Validators.required),
      observaciones: new FormControl(this.motivoReunion.observaciones)
    });
  }

  async confirmEdit(){
    if (this.motivoReunionForm.valid) {
      const motivoReunionForm = this.motivoReunionForm.value;

      const RESPONSE = await this.servicioMotivosReunion.editMotivoReunion(motivoReunionForm).toPromise();
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
