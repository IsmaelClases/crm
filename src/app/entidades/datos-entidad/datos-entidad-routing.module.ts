import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatosEntidadComponent } from './datos-entidad.component';

const routes: Routes = [
  { 
    path: '', 
    component: DatosEntidadComponent,
    redirectTo: 'datos-entidad-reunion'
  },
  { 
    path: 'datos-basicos-entidad', 
    loadChildren: () => import('./datos-basicos-entidad/datos-basicos-entidad.module').then(m => m.DatosBasicosEntidadModule),
    outlet: 'sidebar' 
  },
  { 
    path: 'contactos-entidad', 
    loadChildren: () => import('./contactos-entidad/contactos-entidad.module').then(m => m.ContactosEntidadModule),
    outlet: 'sidebar' 
  },
  { 
    path: 'ciclos-entidad', 
    loadChildren: () => import('./ciclos-entidad/ciclos-entidad.module').then(m => m.CiclosEntidadModule),
    outlet: 'sidebar' 
  },];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatosEntidadRoutingModule { }
