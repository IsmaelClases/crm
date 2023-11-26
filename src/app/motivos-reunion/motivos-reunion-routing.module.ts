import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MotivosReunionComponent } from './motivos-reunion.component';

const routes: Routes = [{ path: '', component: MotivosReunionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MotivosReunionRoutingModule { }
