import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModosReunionComponent } from './modos-reunion.component';

const routes: Routes = [{ path: '', component: ModosReunionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModosReunionRoutingModule { }
