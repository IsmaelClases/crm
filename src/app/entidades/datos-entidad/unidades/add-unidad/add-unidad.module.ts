import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddUnidadRoutingModule } from './add-unidad-routing.module';
import { AddUnidadComponent } from './add-unidad.component';
import { CrudMaterialModule } from 'src/app/modules/crud-material/crud-material.module';


@NgModule({
  declarations: [AddUnidadComponent],
  imports: [
    CommonModule,
    AddUnidadRoutingModule,
    CrudMaterialModule
  ]
})
export class AddUnidadModule { }
