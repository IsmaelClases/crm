import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatosBasicosAlumnosComponent } from './datos-basicos-alumnos.component';
import { DatosBasicosAlumnosRoutingModule } from './datos-basicos-alumnos-routing.module';
import { CrudMaterialModule } from 'src/app/modules/crud-material/crud-material.module';
import { AddAlumnoComponent } from './add-alumno/add-alumno.component';
import { DeleteAlumnoComponent } from './delete-alumno/delete-alumno.component';
import { EditAlumnoComponent } from './edit-alumno/edit-alumno.component';



@NgModule({
  declarations: [DatosBasicosAlumnosComponent, AddAlumnoComponent, DeleteAlumnoComponent, EditAlumnoComponent],
  imports: [
    CommonModule,
    DatosBasicosAlumnosRoutingModule,
    CrudMaterialModule
  ]
})
export class DatosBasicosAlumnosModule { }
