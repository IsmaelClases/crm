import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FamiliasService } from 'src/app/services/familias.service';
import { Familia } from 'src/app/shared/interfaces/familia';
import { CLOSE, ENTIDAD_FAMILIA, ERROR } from '../../shared/messages';


@Component({
  selector: 'app-edit-familia',
  templateUrl: './edit-familia.component.html',
  styleUrls: ['./edit-familia.component.scss']
})
export class EditFamiliaComponent implements OnInit {

  familiaForm: FormGroup;
  ENTIDAD: String;

  constructor(
    public dialogRef: MatDialogRef<EditFamiliaComponent>,
    private snackBar: MatSnackBar,
    private servicioFamilias: FamiliasService,
    @Inject(MAT_DIALOG_DATA) public familia: Familia
  ) { }

  ngOnInit(): void {
    this.ENTIDAD = ENTIDAD_FAMILIA;
    this.familiaForm = new FormGroup({
      id_familia: new FormControl(this.familia.id_familia, Validators.required),
      familia: new FormControl(this.familia.familia, Validators.required),
      observaciones: new FormControl(this.familia.observaciones)
    });
  }

  async confirmEdit(){
    if (this.familiaForm.valid) {
      const familiaForm = this.familiaForm.value;

      const RESPONSE = await this.servicioFamilias.editFamilia(familiaForm).toPromise();
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
