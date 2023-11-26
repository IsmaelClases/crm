import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatosBasicosEntidadComponent } from './datos-basicos-entidad.component';

const routes: Routes = [{ path: '', component: DatosBasicosEntidadComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatosBasicosEntidadRoutingModule { }
