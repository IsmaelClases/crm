import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactosEntidadComponent } from './contactos-entidad.component';

const routes: Routes = [
  { path: '', component: ContactosEntidadComponent },
  { 
    path: 'add-contacto', 
    loadChildren: () => import('./add-contacto/add-contacto.module').then(m => m.AddContactoModule) 
  },
  { 
    path: 'edit-contacto', 
    loadChildren: () => import('./edit-contacto/edit-contacto.module').then(m => m.EditContactoModule) 
  },
  { 
    path: 'delete-contacto', 
    loadChildren: () => import('./delete-contacto/delete-contacto.module').then(m => m.DeleteContactoModule) 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactosEntidadRoutingModule { }
