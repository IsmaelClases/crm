import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpcionesRoutingModule } from './opciones-routing.module';
import { OpcionesComponent } from './opciones.component';
import { AddOpcionComponent } from './add-opcion/add-opcion.component';
import { EditOpcionComponent } from './edit-opcion/edit-opcion.component';
import { DeleteOpcionComponent } from './delete-opcion/delete-opcion.component';
import { CrudMaterialModule } from '../modules/crud-material/crud-material.module';


@NgModule({
  declarations: [
    OpcionesComponent, 
    AddOpcionComponent, 
    EditOpcionComponent, 
    DeleteOpcionComponent
  ],
  imports: [
    CommonModule,
    OpcionesRoutingModule,
    CrudMaterialModule,
  ], entryComponents: [
    AddOpcionComponent, 
    EditOpcionComponent, 
    DeleteOpcionComponent
  ]
})
export class OpcionesModule { }
