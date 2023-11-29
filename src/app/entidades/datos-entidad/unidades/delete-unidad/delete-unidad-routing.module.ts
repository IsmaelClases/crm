import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeleteUnidadComponent } from './delete-unidad.component';

const routes: Routes = [{ path: '', component: DeleteUnidadComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeleteUnidadRoutingModule { }
