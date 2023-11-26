import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Familia } from 'src/app/shared/interfaces/familia';
import { FamiliasService } from 'src/app/services/familias.service';
import { CLOSE, INVALID_FORM, ENTIDAD_FAMILIA } from '../../shared/messages';

@Component({
  selector: 'app-add-familia',
  templateUrl: './add-familia.component.html',
  styleUrls: ['./add-familia.component.scss']
})
export class AddFamiliaComponent implements OnInit {
  familiaForm: FormGroup;

  ENTIDAD: String;

  constructor(public dialogRef: MatDialogRef<AddFamiliaComponent>,
    private snackBar: MatSnackBar,
    private servicioFamilias: FamiliasService
  ){ }

  ngOnInit(): void {
    this.familiaForm = new FormGroup({
      familia: new FormControl(null, Validators.required),
      observaciones: new FormControl(null)
    });
    this.ENTIDAD = ENTIDAD_FAMILIA;
  }

  async confirmAdd() {
    if (this.familiaForm.valid) {
      const familia = this.familiaForm.value as Familia;

      const RESPONSE = await this.servicioFamilias.addFamilia(familia).toPromise();
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
