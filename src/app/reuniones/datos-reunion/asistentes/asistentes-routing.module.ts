import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsistentesComponent } from './asistentes.component';

const routes: Routes = [
  { path: '', component: AsistentesComponent },
  { 
    path: 'add-asistente', 
    loadChildren: () => import('./add-asistente/add-asistente.module').then(m => m.AddAsistenteModule) 
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsistentesRoutingModule { }
