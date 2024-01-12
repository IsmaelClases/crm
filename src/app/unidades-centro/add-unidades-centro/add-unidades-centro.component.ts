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
    // Inicializa el formulario con los campos necesarios para una unidad centro
    this.unidadCentroForm = new FormGroup({
      // Añade los campos requeridos y otros campos opcionales según sea necesario
      unidad_centro: new FormControl(null, Validators.required),
      id_ciclo: new FormControl(null, Validators.required),
      observaciones: new FormControl(null)
    });
    this.getCiclos();
  }

  async confirmAdd() {
    // Verifica si el formulario es válido
    if (this.unidadCentroForm.valid) {
      // Crea un objeto de tipo UnidadCentro con los valores del formulario
      const unidadCentro = this.unidadCentroForm.value as UnidadesCentro;

      // Realiza la solicitud para agregar la unidad centro utilizando el servicio correspondiente
      const RESPONSE = await this.unidadesCentroService.addUnidadesCentro(unidadCentro).toPromise();

      // Verifica la respuesta del servidor
      if (RESPONSE.ok) {
        // Muestra un mensaje de éxito y cierra el diálogo pasando los datos agregados
        this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
        this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
      } else {
        // Muestra un mensaje de error si la operación no fue exitosa
        this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
      }
    } else {
      // Muestra un mensaje si el formulario no es válido
      this.snackBar.open(INVALID_FORM, CLOSE, { duration: 5000 });
    }
  }

  onNoClick() {
    // Cierra el diálogo indicando que la operación no fue exitosa
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
