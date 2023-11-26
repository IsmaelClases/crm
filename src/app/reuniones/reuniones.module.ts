import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReunionesRoutingModule } from './reuniones-routing.module';
import { ReunionesComponent } from './reuniones.component';
import { CrudMaterialModule } from '../modules/crud-material/crud-material.module';
import { AddReunionComponent } from './add-reunion/add-reunion.component';
import { EditReunionComponent } from './edit-reunion/edit-reunion.component';
import { DeleteReunionComponent } from './delete-reunion/delete-reunion.component';
// import { AsistentesComponent } from './asistentes/asistentes.component';
// import { AddAsistenteComponent } from './asistentes/add-asistente/add-asistente.component';
// import { DeleteAsistenteComponent } from './asistentes/delete-asistente/delete-asistente.component';
import { DatosReunionModule } from './datos-reunion/datos-reunion.module';


@NgModule({
  declarations: [ReunionesComponent, AddReunionComponent, EditReunionComponent, DeleteReunionComponent, 
    //AsistentesComponent, AddAsistenteComponent, DeleteAsistenteComponent 
  ],
  imports: [
    CommonModule,
    ReunionesRoutingModule,
    CrudMaterialModule,
    DatosReunionModule
  ]
})
export class ReunionesModule { }
