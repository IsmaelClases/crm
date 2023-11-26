import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModosReunionRoutingModule } from './modos-reunion-routing.module';
import { ModosReunionComponent } from './modos-reunion.component';
import { CrudMaterialModule } from '../modules/crud-material/crud-material.module';
import { AddModoReunionComponent } from './add-modo-reunion/add-modo-reunion.component';
import { DeleteModoReunionComponent } from './delete-modo-reunion/delete-modo-reunion.component';
import { EditModoReunionComponent } from './edit-modo-reunion/edit-modo-reunion.component';


@NgModule({
  declarations: [ModosReunionComponent, AddModoReunionComponent, DeleteModoReunionComponent, EditModoReunionComponent],
  imports: [
    CommonModule,
    ModosReunionRoutingModule,
    CrudMaterialModule
  ]
})
export class ModosReunionModule { }
