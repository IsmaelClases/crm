import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnidadesComponent } from './unidades.component';

const routes: Routes = [
  { path: '', component: UnidadesComponent },
  { 
    path: 'add-unidad', 
    loadChildren: () => import('./add-unidad/add-unidad.module').then(m => m.AddUnidadModule) 
  },
  { 
    path: 'edit-unidad', 
    loadChildren: () => import('./edit-unidad/edit-unidad.module').then(m => m.EditUnidadModule) 
  },
  { 
    path: 'delete-unidad', 
    loadChildren: () => import('./delete-unidad/delete-unidad.module').then(m => m.DeleteUnidadModule) 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnidadesRoutingModule { }
