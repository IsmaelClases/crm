import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeleteContactoComponent } from './delete-contacto.component';

const routes: Routes = [{ path: '', component: DeleteContactoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeleteContactoRoutingModule { }
