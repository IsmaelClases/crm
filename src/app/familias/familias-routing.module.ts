import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FamiliasComponent } from './familias.component';

const routes: Routes = [{ path: '', component: FamiliasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FamiliasRoutingModule { }
