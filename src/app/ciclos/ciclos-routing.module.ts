import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CiclosComponent } from './ciclos.component';

const routes: Routes = [{ path: '', component: CiclosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CiclosRoutingModule { }
