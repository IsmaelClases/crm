import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ZonasComponent } from './zonas.component';

const routes: Routes = [{ path: '', component: ZonasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZonasRoutingModule { }
