import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatosReunionComponent } from './datos-reunion.component';

const routes: Routes = [
  { 
    path: '', 
    component: DatosReunionComponent,
    redirectTo: 'datos-basicos-reunion'
  },
  { 
    path: 'datos-basicos-reunion', 
    loadChildren: () => import('./datos-basicos-reunion/datos-basicos-reunion.module').then(m => m.DatosBasicosReunionModule),
    outlet: 'sidebar' 
  },
  { 
    path: 'objetivo', 
    loadChildren: () => import('./objetivo/objetivo.module').then(m => m.ObjetivoModule),
    outlet: 'sidebar' 
  },
  { 
    path: 'resultado', 
    loadChildren: () => import('./resultado/resultado.module').then(m => m.ResultadoModule),
    outlet: 'sidebar' 
  },
  { 
    path: 'asistentes', 
    loadChildren: () => import('./asistentes/asistentes.module').then(m => m.AsistentesModule),
    outlet: 'sidebar' 
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatosReunionRoutingModule { }
