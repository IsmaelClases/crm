import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FamiliasRoutingModule } from './familias-routing.module';
import { FamiliasComponent } from './familias.component';
import { AddFamiliaComponent } from './add-familia/add-familia.component';
import { DeleteFamiliaComponent } from './delete-familia/delete-familia.component';
import { EditFamiliaComponent } from './edit-familia/edit-familia.component';
import { CrudMaterialModule } from '../modules/crud-material/crud-material.module';


@NgModule({
  declarations: [FamiliasComponent, AddFamiliaComponent, DeleteFamiliaComponent, EditFamiliaComponent],
  imports: [
    CommonModule,
    FamiliasRoutingModule,
    CrudMaterialModule

  ]
})
export class FamiliasModule { }
