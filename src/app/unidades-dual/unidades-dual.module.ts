import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnidadesDualRoutingModule } from './unidades-dual-routing.module';
import { UnidadesDualComponent } from './unidades-dual.component';
import { CrudMaterialModule } from '../modules/crud-material/crud-material.module';
import { AddUnidadDualComponent } from './add-unidad-dual/add-unidad-dual.component';
import { EditUnidadDualComponent } from './edit-unidad-dual/edit-unidad-dual.component';
import { DeleteUnidadDualComponent } from './delete-unidad-dual/delete-unidad-dual.component';

@NgModule({
  declarations: [UnidadesDualComponent, AddUnidadDualComponent, EditUnidadDualComponent, DeleteUnidadDualComponent],
  imports: [
    CommonModule,
    UnidadesDualRoutingModule,
    CrudMaterialModule
  ]
})
export class UnidadesDualModule { }
