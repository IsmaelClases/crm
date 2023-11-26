import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddContactoComponent } from './add-contacto.component';

const routes: Routes = [{ path: '', component: AddContactoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddContactoRoutingModule { }
