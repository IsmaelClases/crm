import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddUnidadComponent } from './add-unidad.component';

const routes: Routes = [{ path: '', component: AddUnidadComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddUnidadRoutingModule { }
