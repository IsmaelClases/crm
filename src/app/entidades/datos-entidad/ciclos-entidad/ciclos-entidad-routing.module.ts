import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CiclosEntidadComponent } from './ciclos-entidad.component';

const routes: Routes = [{ path: '', component: CiclosEntidadComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CiclosEntidadRoutingModule { }
