import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CiclosService } from 'src/app/services/ciclos.service';
import { NivelesService } from '../../services/niveles.service';
import { FamiliasService } from '../../services/familias.service';
import { Ciclo } from 'src/app/shared/interfaces/ciclo';
import { CLOSE, ENTIDAD_CICLO, ERROR } from '../../shared/messages';
import { Nivel } from 'src/app/shared/interfaces/nivel';
import { Familia } from 'src/app/shared/interfaces/familia';

@Component({
  selector: 'app-edit-ciclo',
  templateUrl: './edit-ciclo.component.html',
  styleUrls: ['./edit-ciclo.component.scss']
})
export class EditCicloComponent implements OnInit {

  cicloForm: FormGroup;
  codCicloForm: FormGroup;
  idNivelForm: FormGroup;
  idFamiliaForm: FormGroup;
  niveles: Nivel[];
  familias: Familia[];
  ENTIDAD: String;

  constructor(
    public dialogRef: MatDialogRef<EditCicloComponent>,
    private snackBar: MatSnackBar,
    private servicioCiclos: CiclosService,
    private servicioNiveles: NivelesService,
    private servicioFamilias: FamiliasService,
    @Inject(MAT_DIALOG_DATA) public ciclo: Ciclo
  ) { }

  ngOnInit(): void {
    this.ENTIDAD = ENTIDAD_CICLO;
    this.cicloForm = new FormGroup({
      id_ciclo: new FormControl(this.ciclo.id_ciclo, Validators.required),
      ciclo: new FormControl(this.ciclo.ciclo, Validators.required),
      cod_ciclo: new FormControl(this.ciclo.cod_ciclo, Validators.required),
      id_nivel: new FormControl(this.ciclo.id_nivel, Validators.required),
      id_familia: new FormControl(this.ciclo.id_familia, Validators.required),
      observaciones: new FormControl(this.ciclo.observaciones)
    });

    this.getNiveles();
    this.getFamilias();
  }

  async confirmEdit(){
    if (this.cicloForm.valid) {
      const cicloForm = this.cicloForm.value;

      const RESPONSE = await this.servicioCiclos.editCiclo(cicloForm).toPromise();
      if (RESPONSE.ok) {
        this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
        this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
      } else { this.snackBar.open(ERROR, CLOSE, { duration: 5000 }); }
    } else { this.snackBar.open(ERROR, CLOSE, { duration: 5000 }); }
  }

  onNoClick() {
    this.dialogRef.close({ ok: false });
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
