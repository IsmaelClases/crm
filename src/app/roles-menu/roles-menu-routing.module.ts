import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RolesMenuComponent } from './roles-menu.component';

const routes: Routes = [{ path: '', component: RolesMenuComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesMenuRoutingModule { }
