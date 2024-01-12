import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UnidadesCentro } from 'src/app/shared/interfaces/unidades-centro';
import { UnidadesCentroService } from 'src/app/services/unidades-centro.service';
import { CLOSE, INVALID_FORM } from '../../shared/messages';
import { CiclosService } from '../../services/ciclos.service';
import { Ciclo } from '../../shared/interfaces/ciclo';


@Component({
  selector: 'app-edit-unidades-centro',
  templateUrl: './edit-unidades-centro.component.html',
  styleUrls: ['./edit-unidades-centro.component.scss']
})
export class EditUnidadesCentroComponent implements OnInit {

  unidadesCentroForm: FormGroup;
  unidadCentro: UnidadesCentro;
  ciclos: Ciclo[];

  constructor(
    public dialogRef: MatDialogRef<EditUnidadesCentroComponent>,
    private snackBar: MatSnackBar,
    private unidadesCentroService: UnidadesCentroService,
    private ciclosService: CiclosService,
    @Inject(MAT_DIALOG_DATA) public data: UnidadesCentro
  ) {
    this.unidadCentro = { ...data };
  }

  ngOnInit() {
    this.unidadesCentroForm = new FormGroup({
      id_unidad_centro:new FormControl(this.unidadCentro.id_unidad_centro),
      unidad_centro: new FormControl(this.unidadCentro.unidad_centro, Validators.required),
      id_ciclo: new FormControl(this.unidadCentro.id_ciclo, Validators.required),
      observaciones: new FormControl(this.unidadCentro.observaciones)
    });
    this.getCiclos();
  }

  async confirmEdit() {
    if (this.unidadesCentroForm.valid) {
      const unidadCentro = this.unidadesCentroForm.value;

      try {
        const RESPONSE = await this.unidadesCentroService.editUnidadesCentro(unidadCentro).toPromise();

        if (RESPONSE.ok) {
          this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
          this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
        } else {
          this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
        }
      } catch (error) {
        console.error('Error al editar la unidadCentro:', error);
        this.snackBar.open('Error al editar la unidadCentro', CLOSE, { duration: 5000 });
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
    //this.permises = RESPONSE.permises;

    if (RESPONSE.ok) {
      this.ciclos = RESPONSE.data as Ciclo[];
    }
  }
}
