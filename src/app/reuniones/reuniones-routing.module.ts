import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReunionesComponent } from './reuniones.component';

const routes: Routes = [{ path: '', component: ReunionesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReunionesRoutingModule { }
