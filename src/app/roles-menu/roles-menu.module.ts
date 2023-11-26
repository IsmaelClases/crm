import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesMenuRoutingModule } from './roles-menu-routing.module';
import { RolesMenuComponent } from './roles-menu.component';
import { AddRolMenuComponent } from './add-rol-menu/add-rol-menu.component';
import { EditRolMenuComponent } from './edit-rol-menu/edit-rol-menu.component';
import { DeleteRolMenuComponent } from './delete-rol-menu/delete-rol-menu.component';
import { CrudMaterialModule } from '../modules/crud-material/crud-material.module';


@NgModule({
  declarations: [
    RolesMenuComponent, 
    AddRolMenuComponent, 
    EditRolMenuComponent, 
    DeleteRolMenuComponent
  ],
  imports: [
    CommonModule,
    RolesMenuRoutingModule,
    CrudMaterialModule
  ], entryComponents: [
    AddRolMenuComponent, 
    EditRolMenuComponent, 
    DeleteRolMenuComponent
  ]
})
export class RolesMenuModule { }
