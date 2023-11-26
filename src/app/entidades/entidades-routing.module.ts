import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntidadesComponent } from './entidades.component';

const routes: Routes = [{ path: '', component: EntidadesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntidadesRoutingModule { }
