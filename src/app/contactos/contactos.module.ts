import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactosRoutingModule } from './contactos-routing.module';
import { ContactosComponent } from './contactos.component';
import { CrudMaterialModule } from '../modules/crud-material/crud-material.module';
import { AddContactoComponent } from './add-contacto/add-contacto.component';
import { EditContactoComponent } from './edit-contacto/edit-contacto.component';
import { DeleteContactoComponent } from './delete-contacto/delete-contacto.component';


@NgModule({
  declarations: [ContactosComponent, AddContactoComponent, EditContactoComponent, DeleteContactoComponent],
  imports: [
    CommonModule,
    ContactosRoutingModule,
    CrudMaterialModule
  ]
})
export class ContactosModule { }
