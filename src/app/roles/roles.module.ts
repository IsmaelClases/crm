import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles.component';
import { AddRolComponent } from './add-rol/add-rol.component';
import { EditRolComponent } from './edit-rol/edit-rol.component';
import { DeleteRolComponent } from './delete-rol/delete-rol.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { CrudMaterialModule } from '../modules/crud-material/crud-material.module';


@NgModule({
  declarations: [
    RolesComponent, 
    AddRolComponent, 
    EditRolComponent, 
    DeleteRolComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    CrudMaterialModule
  ], entryComponents: [
    AddRolComponent, 
    EditRolComponent, 
    DeleteRolComponent
  ]
})
export class RolesModule { }
