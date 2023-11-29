import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditUnidadRoutingModule } from './edit-unidad-routing.module';
import { EditUnidadComponent } from './edit-unidad.component';
import { CrudMaterialModule } from 'src/app/modules/crud-material/crud-material.module';


@NgModule({
  declarations: [EditUnidadComponent],
  imports: [
    CommonModule,
    EditUnidadRoutingModule,
    CrudMaterialModule
  ]
})
export class EditUnidadModule { }
