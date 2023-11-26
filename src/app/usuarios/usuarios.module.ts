import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { AddUsuarioComponent } from './add-usuario/add-usuario.component';
import { EditUsuarioComponent } from './edit-usuario/edit-usuario.component';
import { DeleteUsuarioComponent } from './delete-usuario/delete-usuario.component';
import { CrudMaterialModule } from '../modules/crud-material/crud-material.module';

@NgModule({
  declarations: [
    UsuariosComponent,
    AddUsuarioComponent,
    EditUsuarioComponent,
    DeleteUsuarioComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    CrudMaterialModule
  ], entryComponents: [
    AddUsuarioComponent,
    EditUsuarioComponent,
    DeleteUsuarioComponent
  ]
})
export class UsuariosModule { }
