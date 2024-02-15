import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacantesAlumnosComponent } from './vacantes-alumnos.component';
import { CrudMaterialModule } from '../modules/crud-material/crud-material.module';
import { VacantesAlumnosRoutingModule } from './vacantes-alumnos-routing.module';
import { AddVacanteComponent } from './add-vacante/add-vacante.component';
import { DeleteVacanteComponent } from './delete-vacante/delete-vacante.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EditVacanteComponent } from './edit-vacante/edit-vacante.component';
import { InfoVacantesComponent } from './info-vacantes/info-vacantes.component';



@NgModule({
  declarations: [VacantesAlumnosComponent, AddVacanteComponent, DeleteVacanteComponent, EditVacanteComponent, InfoVacantesComponent],
  imports: [
    CommonModule,
    MatPaginatorModule,
    CrudMaterialModule,
    VacantesAlumnosRoutingModule
  ]
})
export class VacantesAlumnosModule { }
