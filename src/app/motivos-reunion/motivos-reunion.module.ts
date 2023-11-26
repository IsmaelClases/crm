import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MotivosReunionRoutingModule } from './motivos-reunion-routing.module';
import { MotivosReunionComponent } from './motivos-reunion.component';
import { CrudMaterialModule } from '../modules/crud-material/crud-material.module';
import { AddMotivoReunionComponent } from './add-motivo-reunion/add-motivo-reunion.component';
import { DeleteMotivoReunionComponent } from './delete-motivo-reunion/delete-motivo-reunion.component';
import { EditMotivoReunionComponent } from './edit-motivo-reunion/edit-motivo-reunion.component';


@NgModule({
  declarations: [MotivosReunionComponent, AddMotivoReunionComponent, DeleteMotivoReunionComponent, EditMotivoReunionComponent],
  imports: [
    CommonModule,
    MotivosReunionRoutingModule,
    CrudMaterialModule
  ]
})
export class MotivosReunionModule { }
