import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsistentesRoutingModule } from './asistentes-routing.module';
import { AsistentesComponent } from './asistentes.component';
import { CrudMaterialModule } from '../../../modules/crud-material/crud-material.module';


@NgModule({
  declarations: [AsistentesComponent],
  imports: [
    CommonModule,
    AsistentesRoutingModule,
    CrudMaterialModule
  ]
})
export class AsistentesModule { }
