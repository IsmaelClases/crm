import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TiposEntidadComponent } from './tipos-entidad.component';

const routes: Routes = [{ path: '', component: TiposEntidadComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TiposEntidadRoutingModule { }
