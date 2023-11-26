import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZonasRoutingModule } from './zonas-routing.module';
import { ZonasComponent } from './zonas.component';
import { CrudMaterialModule } from '../modules/crud-material/crud-material.module';
import { AddZonaComponent } from './add-zona/add-zona.component';
import { DeleteZonaComponent } from './delete-zona/delete-zona.component';
import { EditZonaComponent } from './edit-zona/edit-zona.component';


@NgModule({
  declarations: [ZonasComponent, AddZonaComponent, DeleteZonaComponent, EditZonaComponent],
  imports: [
    CommonModule,
    ZonasRoutingModule,
    CrudMaterialModule
  ]
})
export class ZonasModule { }
