import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactosEntidadRoutingModule } from './contactos-entidad-routing.module';
import { ContactosEntidadComponent } from './contactos-entidad.component';
import { CrudMaterialModule } from '../../../modules/crud-material/crud-material.module';


@NgModule({
  declarations: [ContactosEntidadComponent],
  imports: [
    CommonModule,
    ContactosEntidadRoutingModule,
    CrudMaterialModule
  ]
})
export class ContactosEntidadModule { }
