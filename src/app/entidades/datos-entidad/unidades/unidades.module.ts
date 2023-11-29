import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnidadesRoutingModule } from './unidades-routing.module';
import { UnidadesComponent } from './unidades.component';
import { CrudMaterialModule } from '../../../modules/crud-material/crud-material.module';


@NgModule({
  declarations: [UnidadesComponent],
  imports: [
    CommonModule,
    UnidadesRoutingModule,
    CrudMaterialModule
  ]
})
export class UnidadesModule { }
