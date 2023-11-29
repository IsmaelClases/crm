import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NivelesRoutingModule } from './niveles-routing.module';
import { NivelesComponent } from './niveles.component';
import { CrudMaterialModule } from '../modules/crud-material/crud-material.module';
import { AddNivelComponent } from './add-nivel/add-nivel.component';
import { EditNivelComponent } from './edit-nivel/edit-nivel.component';
import { DeleteNivelComponent } from './delete-nivel/delete-nivel.component';

@NgModule({
  declarations: [NivelesComponent, AddNivelComponent, EditNivelComponent, DeleteNivelComponent],
  imports: [
    CommonModule,
    NivelesRoutingModule,
    CrudMaterialModule
  ]
})
export class NivelesModule { }
