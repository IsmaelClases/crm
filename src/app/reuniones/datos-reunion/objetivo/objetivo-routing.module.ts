import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ObjetivoComponent } from './objetivo.component';

const routes: Routes = [{ path: '', component: ObjetivoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObjetivoRoutingModule { }
