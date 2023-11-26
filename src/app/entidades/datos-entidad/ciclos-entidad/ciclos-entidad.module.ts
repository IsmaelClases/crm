import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CiclosEntidadRoutingModule } from './ciclos-entidad-routing.module';
import { CiclosEntidadComponent } from './ciclos-entidad.component';


@NgModule({
  declarations: [CiclosEntidadComponent],
  imports: [
    CommonModule,
    CiclosEntidadRoutingModule
  ]
})
export class CiclosEntidadModule { }
