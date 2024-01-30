import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatosUnidadCentroRoutingModule } from './datos-unidad-centro-routing.module';
import { DatosUnidadCentroComponent } from './datos-unidad-centro.component';
import { CrudMaterialModule } from '../../modules/crud-material/crud-material.module';



@NgModule({
  declarations: [DatosUnidadCentroComponent],
  imports: [
    CommonModule,
    DatosUnidadCentroRoutingModule,
    CrudMaterialModule
  ]
})
export class DatosUnidadCentroModule { }
