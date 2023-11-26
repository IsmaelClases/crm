import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatosBasicosReunionComponent } from './datos-basicos-reunion.component';

const routes: Routes = [{ path: '', component: DatosBasicosReunionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatosBasicosReunionRoutingModule { }
