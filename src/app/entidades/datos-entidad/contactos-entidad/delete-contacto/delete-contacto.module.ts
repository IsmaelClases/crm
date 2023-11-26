import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteContactoRoutingModule } from './delete-contacto-routing.module';
import { DeleteContactoComponent } from './delete-contacto.component';
import { CrudMaterialModule } from 'src/app/modules/crud-material/crud-material.module';


@NgModule({
  declarations: [DeleteContactoComponent],
  imports: [
    CommonModule,
    DeleteContactoRoutingModule,
    CrudMaterialModule
  ]
})
export class DeleteContactoModule { }
