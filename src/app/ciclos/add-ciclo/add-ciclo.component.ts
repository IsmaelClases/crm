import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Ciclo } from 'src/app/shared/interfaces/ciclo';
import { Nivel } from 'src/app/shared/interfaces/nivel';
import { Familia } from 'src/app/shared/interfaces/familia';
import { CiclosService } from 'src/app/services/ciclos.service';
import { CLOSE, INVALID_FORM, ENTIDAD_CICLO } from '../../shared/messages';
import { NivelesService } from '../../services/niveles.service';
import { FamiliasService } from '../../services/familias.service';

@Component({
  selector: 'app-add-ciclo',
  templateUrl: './add-ciclo.component.html',
  styleUrls: ['./add-ciclo.component.scss']
})
export class AddCicloComponent implements OnInit {
  cicloForm: FormGroup;
  codCicloForm: FormGroup;
  idNivelForm: FormGroup;
  idFamiliaForm: FormGroup;
  niveles: Nivel[];
  familias: Familia[];

  ENTIDAD: String;

  constructor(public dialogRef: MatDialogRef<AddCicloComponent>,
    private snackBar: MatSnackBar,
    private servicioCiclos: CiclosService,
    private servicioNiveles: NivelesService,
    private servicioFamilias: FamiliasService
  ){ }

  ngOnInit(): void {
    this.cicloForm = new FormGroup({
      ciclo: new FormControl(null, Validators.required),
      cod_ciclo: new FormControl(null, Validators.required),
      id_nivel: new FormControl(null, Validators.required),
      id_familia: new FormControl(null, Validators.required),
      observaciones: new FormControl(null)
    });
    this.ENTIDAD = ENTIDAD_CICLO;

    this.getNiveles();
    this.getFamilias();
  }

  async confirmAdd() {
    if (this.cicloForm.valid) {
      const ciclo = this.cicloForm.value as Ciclo;

      const RESPONSE = await this.servicioCiclos.addCiclo(ciclo).toPromise();
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

  async getNiveles(){
    const RESPONSE = await this.servicioNiveles.getAllNiveles().toPromise();
    if (RESPONSE.ok){
      this.niveles = RESPONSE.data as Nivel[];
    }
  }

  async getFamilias(){
    const RESPONSE = await this.servicioFamilias.getAllFamilias().toPromise();
    if (RESPONSE.ok){
      this.familias = RESPONSE.data as Familia[];
    }
  }
}
