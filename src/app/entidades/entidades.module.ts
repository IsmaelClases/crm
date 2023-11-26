import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntidadesRoutingModule } from './entidades-routing.module';
import { EntidadesComponent } from './entidades.component';
import { CrudMaterialModule } from '../modules/crud-material/crud-material.module';
import { DeleteEntidadComponent } from './delete-entidad/delete-entidad.component';
import { AddEntidadComponent } from './add-entidad/add-entidad.component';
import { EditEntidadComponent } from './edit-entidad/edit-entidad.component';

import { DatosEntidadModule } from './datos-entidad/datos-entidad.module';


@NgModule({
  declarations: [EntidadesComponent, DeleteEntidadComponent, AddEntidadComponent, EditEntidadComponent],
  imports: [
    CommonModule,
    EntidadesRoutingModule,
    CrudMaterialModule,
    DatosEntidadModule
  ]
})
export class EntidadesModule { }
