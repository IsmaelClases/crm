import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModosReunionService } from 'src/app/services/modos-reunion.service';
import { ModoReunion } from 'src/app/shared/interfaces/modo-reunion';
import { CLOSE, ENTIDAD_MODO_REUNION, ERROR } from '../../shared/messages';


@Component({
  selector: 'app-edit-modo-reunion',
  templateUrl: './edit-modo-reunion.component.html',
  styleUrls: ['./edit-modo-reunion.component.scss']
})
export class EditModoReunionComponent implements OnInit {

  modoReunionForm: FormGroup;
  ENTIDAD: String;

  constructor(
    public dialogRef: MatDialogRef<EditModoReunionComponent>,
    private snackBar: MatSnackBar,
    private servicioModosReunion: ModosReunionService,
    @Inject(MAT_DIALOG_DATA) public modoReunion: ModoReunion
  ) { }

  ngOnInit(): void {
    this.ENTIDAD = ENTIDAD_MODO_REUNION;
    this.modoReunionForm = new FormGroup({
      id_modo_reunion: new FormControl(this.modoReunion.id_modo_reunion, Validators.required),
      modo_reunion: new FormControl(this.modoReunion.modo_reunion, Validators.required),
      observaciones: new FormControl(this.modoReunion.observaciones)
    });
  }

  async confirmEdit(){
    if (this.modoReunionForm.valid) {
      const modoReunionForm = this.modoReunionForm.value;

      const RESPONSE = await this.servicioModosReunion.editModoReunion(modoReunionForm).toPromise();
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
