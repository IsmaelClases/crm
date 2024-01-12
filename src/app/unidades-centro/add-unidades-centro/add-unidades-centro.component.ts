import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UnidadesCentroService } from 'src/app/services/unidades-centro.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UnidadesCentro } from 'src/app/shared/interfaces/unidades-centro';
import { CLOSE, INVALID_FORM } from '../../shared/messages';
import { CiclosService } from '../../services/ciclos.service';
import { Ciclo } from '../../shared/interfaces/ciclo';

@Component({
  selector: 'app-add-unidades-centro',
  templateUrl: './add-unidades-centro.component.html',
  styleUrls: ['./add-unidades-centro.component.scss']
})
export class AddUnidadesCentroComponent implements OnInit {
  unidadCentroForm: FormGroup;
  ciclos: Ciclo[];

  constructor(
    public dialogRef: MatDialogRef<AddUnidadesCentroComponent>,
    private snackBar: MatSnackBar,
    private unidadesCentroService: UnidadesCentroService,
    private ciclosService: CiclosService
  ) {}

  ngOnInit() {
    this.unidadCentroForm = new FormGroup({
      unidad_centro: new FormControl(null, Validators.required),
      id_ciclo: new FormControl(null, Validators.required),
      observaciones: new FormControl(null)
    });
    this.getCiclos();
  }

  async confirmAdd() {
    if (this.unidadCentroForm.valid) {
      const unidadCentro = this.unidadCentroForm.value as UnidadesCentro;
      const RESPONSE = await this.unidadesCentroService.addUnidadesCentro(unidadCentro).toPromise();

      if (RESPONSE.ok) {
        this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
        this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
      } else {
        this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
      }
    } else {
      this.snackBar.open(INVALID_FORM, CLOSE, { duration: 5000 });
    }
  }

  onNoClick() {
    this.dialogRef.close({ ok: false });
  }

  async getCiclos() {
    const RESPONSE = await this.ciclosService.getAllCiclos().toPromise();

    if (RESPONSE.ok) {
      this.ciclos = RESPONSE.data as Ciclo[];
    }
  }
}
