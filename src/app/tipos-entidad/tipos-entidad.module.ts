import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TiposEntidadRoutingModule } from './tipos-entidad-routing.module';
import { TiposEntidadComponent } from './tipos-entidad.component';
import { CrudMaterialModule } from '../modules/crud-material/crud-material.module';
import { AddTipoEntidadComponent } from './add-tipo-entidad/add-tipo-entidad.component';
import { DeleteTipoEntidadComponent } from './delete-tipo-entidad/delete-tipo-entidad.component';
import { EditTipoEntidadComponent } from './edit-tipo-entidad/edit-tipo-entidad.component';


@NgModule({
  declarations: [TiposEntidadComponent, AddTipoEntidadComponent, DeleteTipoEntidadComponent, EditTipoEntidadComponent],
  imports: [
    CommonModule,
    TiposEntidadRoutingModule,
    CrudMaterialModule
  ]
})
export class TiposEntidadModule { }
