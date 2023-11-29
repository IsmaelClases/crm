import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnidadesDualComponent } from './unidades-dual.component';

const routes: Routes = [{ path: '', component: UnidadesDualComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnidadesDualRoutingModule { }
