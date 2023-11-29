import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Unidad } from 'src/app/shared/interfaces/unidad';
import { UnidadesService } from 'src/app/services/unidades.service';
import { CLOSE, INVALID_FORM, ENTIDAD_UNIDAD } from 'src/app/shared/messages';
import { Ciclo } from 'src/app/shared/interfaces/ciclo';
import { CiclosService } from 'src/app/services/ciclos.service';
import { UnidadDual } from 'src/app/shared/interfaces/unidad-dual';
import { UnidadesDualService } from 'src/app/services/unidades-dual.service';
import { MotivoNodual } from 'src/app/shared/interfaces/motivo-nodual';
import { MotivosNodualService } from 'src/app/services/motivos-nodual.service';

@Component({
  selector: 'app-add-unidad',
  templateUrl: './add-unidad.component.html',
  styleUrls: ['./add-unidad.component.scss']
})
export class AddUnidadComponent implements OnInit {
  unidadForm: FormGroup;
  ciclos: Ciclo[];
  unidades_dual: UnidadDual[];
  motivos_nodual: MotivoNodual[];

  ENTIDAD: String;
  esDual = true;

  constructor(public dialogRef: MatDialogRef<AddUnidadComponent>,
    private snackBar: MatSnackBar,
    private servicioUnidades: UnidadesService,
    private servicioCiclos: CiclosService,
    private servicioUnidadesDual: UnidadesDualService,
    private servicioMotivosNodual: MotivosNodualService,
    @Inject(MAT_DIALOG_DATA) public idEntidad: number,

  ){ }

  ngOnInit(): void {
    this.unidadForm = new FormGroup({
      id_entidad: new FormControl(this.idEntidad, Validators.required),
      id_ciclo: new FormControl(null, Validators.required),
      unidad: new FormControl(null, Validators.required),
      plazas: new FormControl(null, Validators.required),
      id_unidad_dual: new FormControl(null, Validators.required),
      id_motivo_nodual: new FormControl(null),
      observaciones: new FormControl(null)
    });
    this.ENTIDAD = ENTIDAD_UNIDAD;

    this.getCiclos();
    this.getUnidadesDual();
    this.getMotivosNodual(this.idEntidad);
    
  }

  async confirmAdd() {
    if (this.unidadForm.valid) {
      const unidad = this.unidadForm.value as Unidad;

      const RESPONSE = await this.servicioUnidades.addUnidad(unidad).toPromise();
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

  async getCiclos(){
    const RESPONSE = await this.servicioCiclos.getAllCiclos().toPromise();
    if (RESPONSE.ok){
      this.ciclos = RESPONSE.data as Ciclo[];
    }
  }

  async getUnidadesDual(){
    const RESPONSE = await this.servicioUnidadesDual.getAllUnidadesDual().toPromise();
    if (RESPONSE.ok){
      this.unidades_dual = RESPONSE.data as UnidadDual[];
    }
  }

  async getMotivosNodual(idEntidad: number){
    const RESPONSE = await this.servicioMotivosNodual.get(idEntidad).toPromise();
    if (RESPONSE.ok){
      this.motivos_nodual = RESPONSE.data as MotivoNodual[];
    }
  }

  onNoClick() {
    this.dialogRef.close({ok: false});
  }  

  async unidadDual(ud: number) {
    this.esDual = (ud > 1);
    console.log(this.esDual);
  }
}
