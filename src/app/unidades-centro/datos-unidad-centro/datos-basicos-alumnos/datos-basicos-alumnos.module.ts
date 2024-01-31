import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatosBasicosAlumnosComponent } from './datos-basicos-alumnos.component';
import { DatosBasicosAlumnosRoutingModule } from './datos-basicos-alumnos-routing.module';
import { CrudMaterialModule } from 'src/app/modules/crud-material/crud-material.module';
import { AddAlumnoComponent } from './add-alumno/add-alumno.component';
import { DeleteAlumnoComponent } from './delete-alumno/delete-alumno.component';
import { EditAlumnoComponent } from './edit-alumno/edit-alumno.component';
import { EdadAlumnoPipe } from 'src/app/shared/pipes/edad-alumno.pipe';
import { LinkedinUrlPipe } from 'src/app/shared/pipes/linkedinUrl.pipe';

@NgModule({
  declarations: [DatosBasicosAlumnosComponent, AddAlumnoComponent, DeleteAlumnoComponent, EditAlumnoComponent, EdadAlumnoPipe, LinkedinUrlPipe],
  imports: [
    CommonModule,
    DatosBasicosAlumnosRoutingModule,
    CrudMaterialModule, 
  ]
})
export class DatosBasicosAlumnosModule { }
