import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MotivosNodualComponent } from './motivos-nodual.component';

const routes: Routes = [{ path: '', component: MotivosNodualComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MotivosNodualRoutingModule { }
