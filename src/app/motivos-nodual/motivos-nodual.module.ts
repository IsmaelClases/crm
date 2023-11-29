import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MotivosNodualRoutingModule } from './motivos-nodual-routing.module';
import { MotivosNodualComponent } from './motivos-nodual.component';
import { CrudMaterialModule } from '../modules/crud-material/crud-material.module';
import { AddMotivoNodualComponent } from './add-motivo-nodual/add-motivo-nodual.component';
import { EditMotivoNodualComponent } from './edit-motivo-nodual/edit-motivo-nodual.component';
import { DeleteMotivoNodualComponent } from './delete-motivo-nodual/delete-motivo-nodual.component';


@NgModule({
  declarations: [MotivosNodualComponent, AddMotivoNodualComponent, EditMotivoNodualComponent, DeleteMotivoNodualComponent],
  imports: [
    CommonModule,
    MotivosNodualRoutingModule,
    CrudMaterialModule
  ]
})
export class MotivosNodualModule { }
