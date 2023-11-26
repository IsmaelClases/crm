import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatosReunionRoutingModule } from './datos-reunion-routing.module';
import { DatosReunionComponent } from './datos-reunion.component';
import { CrudMaterialModule } from '../../modules/crud-material/crud-material.module';


@NgModule({
  declarations: [DatosReunionComponent],
  imports: [
    CommonModule,
    DatosReunionRoutingModule,
    CrudMaterialModule
  ]
})
export class DatosReunionModule { }
