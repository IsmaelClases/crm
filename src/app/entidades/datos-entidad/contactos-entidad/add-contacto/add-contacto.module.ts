import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddContactoRoutingModule } from './add-contacto-routing.module';
import { AddContactoComponent } from './add-contacto.component';
import { CrudMaterialModule } from 'src/app/modules/crud-material/crud-material.module';


@NgModule({
  declarations: [AddContactoComponent],
  imports: [
    CommonModule,
    AddContactoRoutingModule,
    CrudMaterialModule
  ]
})
export class AddContactoModule { }
