import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatosBasicosEntidadRoutingModule } from './datos-basicos-entidad-routing.module';
import { DatosBasicosEntidadComponent } from './datos-basicos-entidad.component';
import { CrudMaterialModule } from '../../../modules/crud-material/crud-material.module';


@NgModule({
  declarations: [DatosBasicosEntidadComponent],
  imports: [
    CommonModule,
    DatosBasicosEntidadRoutingModule,
    CrudMaterialModule
  ]
})
export class DatosBasicosEntidadModule { }
