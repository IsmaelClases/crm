import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UnidadesCentroService } from 'src/app/services/unidades-centro.service';
import { UnidadesCentro } from 'src/app/shared/interfaces/unidades-centro';
import { DatosUnidadCentroComponent } from '../datos-unidad-centro.component';
import { Ciclo } from 'src/app/shared/interfaces/ciclo';
import { CiclosService } from 'src/app/services/ciclos.service';

@Component({
  selector: 'app-datos-basicos-unidad-centro',
  templateUrl: './datos-basicos-unidad-centro.component.html',
  styleUrls: ['./datos-basicos-unidad-centro.component.scss']
})
export class DatosBasicosUnidadCentroComponent implements OnInit {

  datosUnidadesCentroForm: FormGroup;
  unidadCentro: UnidadesCentro;
  ciclos: Ciclo[];

  constructor(
    private datosUnidadCentro: DatosUnidadCentroComponent,
    public unidadCentroService: UnidadesCentroService,
    private ciclosService: CiclosService,
  ) {
    this.unidadCentro = datosUnidadCentro.datosEditarUnidadCentro.unidadCentro
  }

  ngOnInit(): void {
    this.setForm();
    this.getCiclos();
    this.datosUnidadesCentroForm.valueChanges.subscribe(form => {
      // Encuentra el ciclo correspondiente para poder actualizar dinamicamente la tabla (si no al cambiar de ciclo se queda en blanco)
      const cicloEncontrado = this.ciclos.find(ciclo => ciclo.id_ciclo === form.id_ciclo);
      // Asigna el nombre del ciclo
      form.ciclo = cicloEncontrado ? cicloEncontrado.ciclo : '';
      this.unidadCentroService.setDatosBasicosUnidadCentro(form)
    })
  }

  setForm(): void {
    this.datosUnidadesCentroForm = new FormGroup({
      id_unidad_centro: new FormControl(this.unidadCentroService.unidadCentro.id_unidad_centro, Validators.required),
      unidad_centro: new FormControl(this.unidadCentroService.unidadCentro.unidad_centro, Validators.required),
      id_ciclo: new FormControl(this.unidadCentroService.unidadCentro.id_ciclo, Validators.required),
      ciclo: new FormControl(this.unidadCentroService.unidadCentro.ciclo, Validators.required),
      observaciones: new FormControl(this.unidadCentroService.unidadCentro.observaciones)
    })
  }

  async getCiclos() {
    const RESPONSE = await this.ciclosService.getAllCiclos().toPromise();
    //this.permises = RESPONSE.permises;

    if (RESPONSE.ok) {
      this.ciclos = RESPONSE.data as Ciclo[];
    }
  }
}
