import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UnidadesService } from 'src/app/services/unidades.service';
import { Unidad } from 'src/app/shared/interfaces/unidad';
import { CLOSE, ENTIDAD_UNIDAD, ERROR } from 'src/app/shared/messages';
import { Ciclo } from 'src/app/shared/interfaces/ciclo';
import { CiclosService } from 'src/app/services/ciclos.service';
import { UnidadDual } from 'src/app/shared/interfaces/unidad-dual';
import { UnidadesDualService } from 'src/app/services/unidades-dual.service';
import { MotivoNodual } from 'src/app/shared/interfaces/motivo-nodual';
import { MotivosNodualService } from 'src/app/services/motivos-nodual.service';

@Component({
  selector: 'app-edit-unidad',
  templateUrl: './edit-unidad.component.html',
  styleUrls: ['./edit-unidad.component.scss']
})
export class EditUnidadComponent implements OnInit {

  unidadForm: FormGroup;
  ciclos: Ciclo[];
  unidades_dual: UnidadDual[];
  motivos_nodual: MotivoNodual[];

  // Para autocompletar...
  //familias: any[]
  //arrayFiltradoAutocomplete: any[] = [];
  //filteredOptions: Observable<any[]>;

  ENTIDAD: String;
  esDual = true;


  constructor(
    public dialogRef: MatDialogRef<EditUnidadComponent>,
    private snackBar: MatSnackBar,
    private servicioUnidades: UnidadesService,
    @Inject(MAT_DIALOG_DATA) public unidad: Unidad,
    private servicioCiclos: CiclosService,
    private servicioUnidadesDual: UnidadesDualService,
    private servicioMotivosNodual: MotivosNodualService,

  ) { }

  ngOnInit(): void {
    this.setForm();
    //this.setFilter();
  }

  setForm() {
    this.ENTIDAD = ENTIDAD_UNIDAD;
    this.unidadForm = new FormGroup({
      id_unidad: new FormControl(this.unidad.id_unidad, Validators.required),
      id_entidad: new FormControl(this.unidad.id_entidad, Validators.required),
      id_ciclo: new FormControl(this.unidad.id_ciclo, Validators.required),
      unidad: new FormControl(this.unidad.unidad, Validators.required),
      plazas: new FormControl(this.unidad.plazas, Validators.required),
      id_unidad_dual: new FormControl(this.unidad.id_unidad_dual, Validators.required),
      id_motivo_nodual: new FormControl(this.unidad.id_motivo_nodual),
      observaciones: new FormControl(null)
    });

    this.unidadDual(this.unidad.id_unidad_dual);

    this.getCiclos();
    this.getUnidadesDual();
    this.getMotivosNodual(this.unidad.id_entidad);
  }

  async confirmEdit(){
    console.log(this.unidad);
    if (this.unidadForm.valid) {
      const unidadForm = this.unidadForm.value;

      const RESPONSE = await this.servicioUnidades.editUnidad(unidadForm).toPromise();
      if (RESPONSE.ok) {
        this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 });
        this.dialogRef.close({ ok: RESPONSE.ok, data: RESPONSE.data });
      } else { 
        this.snackBar.open(RESPONSE.message, CLOSE, { duration: 5000 }); 
      }
    } else { 
      this.snackBar.open(ERROR, CLOSE, { duration: 5000 }); 
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
    this.dialogRef.close({ ok: false });
  }

  async unidadDual(ud: number) {
    this.esDual = (ud > 1);
    console.log(this.esDual);
  }
}
