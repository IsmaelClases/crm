import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAsistenteComponent } from './add-asistente.component';

const routes: Routes = [{ path: '', component: AddAsistenteComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddAsistenteRoutingModule { }
