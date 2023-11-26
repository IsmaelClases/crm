import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OpcionesComponent } from './opciones.component';

const routes: Routes = [{ path: '', component: OpcionesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpcionesRoutingModule { }
