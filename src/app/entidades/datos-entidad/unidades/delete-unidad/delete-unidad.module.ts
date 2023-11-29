import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteUnidadRoutingModule } from './delete-unidad-routing.module';
import { DeleteUnidadComponent } from './delete-unidad.component';
import { CrudMaterialModule } from 'src/app/modules/crud-material/crud-material.module';


@NgModule({
  declarations: [DeleteUnidadComponent],
  imports: [
    CommonModule,
    DeleteUnidadRoutingModule,
    CrudMaterialModule
  ]
})
export class DeleteUnidadModule { }
