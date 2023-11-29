import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NivelesComponent } from './niveles.component';

const routes: Routes = [{ path: '', component: NivelesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NivelesRoutingModule { }
