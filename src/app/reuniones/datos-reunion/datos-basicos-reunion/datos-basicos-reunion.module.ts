import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatosBasicosReunionRoutingModule } from './datos-basicos-reunion-routing.module';
import { DatosBasicosReunionComponent } from './datos-basicos-reunion.component';
import { CrudMaterialModule } from '../../../modules/crud-material/crud-material.module';


@NgModule({
  declarations: [DatosBasicosReunionComponent],
  imports: [
    CommonModule,
    DatosBasicosReunionRoutingModule,
    CrudMaterialModule
  ]
})
export class DatosBasicosReunionModule { }
