import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditContactoComponent } from './edit-contacto.component';

const routes: Routes = [{ path: '', component: EditContactoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditContactoRoutingModule { }
