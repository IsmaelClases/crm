import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditContactoRoutingModule } from './edit-contacto-routing.module';
import { EditContactoComponent } from './edit-contacto.component';
import { CrudMaterialModule } from 'src/app/modules/crud-material/crud-material.module';


@NgModule({
  declarations: [EditContactoComponent],
  imports: [
    CommonModule,
    EditContactoRoutingModule,
    CrudMaterialModule
  ]
})
export class EditContactoModule { }
