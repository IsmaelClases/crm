import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatosEntidadRoutingModule } from './datos-entidad-routing.module';
import { DatosEntidadComponent } from './datos-entidad.component';
//import { CrudMaterialModule } from '../../modules/crud-material/crud-material.module';
import { CrudMaterialModule } from '../../modules/crud-material/crud-material.module'

@NgModule({
  declarations: [DatosEntidadComponent],
  imports: [
    CommonModule,
    DatosEntidadRoutingModule,
    CrudMaterialModule
  ]
})
export class DatosEntidadModule { }
