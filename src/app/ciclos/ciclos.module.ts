import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CiclosRoutingModule } from './ciclos-routing.module';
import { CiclosComponent } from './ciclos.component';
import { CrudMaterialModule } from '../modules/crud-material/crud-material.module';
import { AddCicloComponent } from './add-ciclo/add-ciclo.component';
import { EditCicloComponent } from './edit-ciclo/edit-ciclo.component';
import { DeleteCicloComponent } from './delete-ciclo/delete-ciclo.component';


@NgModule({
  declarations: [CiclosComponent, AddCicloComponent, EditCicloComponent, DeleteCicloComponent],
  imports: [
    CommonModule,
    CiclosRoutingModule,
    CrudMaterialModule
  ]
})
export class CiclosModule { }
