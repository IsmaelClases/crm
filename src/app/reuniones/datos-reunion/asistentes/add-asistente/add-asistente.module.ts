import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddAsistenteRoutingModule } from './add-asistente-routing.module';
import { AddAsistenteComponent } from './add-asistente.component';
import { CrudMaterialModule } from 'src/app/modules/crud-material/crud-material.module';


@NgModule({
  declarations: [AddAsistenteComponent],
  imports: [
    CommonModule,
    AddAsistenteRoutingModule,
    CrudMaterialModule
  ]
})
export class AddAsistenteModule { }
