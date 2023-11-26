import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GruposRoutingModule } from './grupos-routing.module';
import { GruposComponent } from './grupos.component';
import { AddGrupoComponent } from './add-grupo/add-grupo.component';
import { EditGrupoComponent } from './edit-grupo/edit-grupo.component';
import { DeleteGrupoComponent } from './delete-grupo/delete-grupo.component';
import { CrudMaterialModule } from '../modules/crud-material/crud-material.module';


@NgModule({
  declarations: [
    GruposComponent,
    AddGrupoComponent,
    EditGrupoComponent,
    DeleteGrupoComponent
  ],
  imports: [
    CommonModule,
    GruposRoutingModule,
    CrudMaterialModule
  ], entryComponents: [
    AddGrupoComponent,
    EditGrupoComponent,
    DeleteGrupoComponent
  ]
})
export class GruposModule { }
