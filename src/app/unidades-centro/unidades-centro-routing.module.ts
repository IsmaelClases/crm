import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnidadesCentroComponent } from './unidades-centro.component';

const routes: Routes = [
  { path: '', component: UnidadesCentroComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnidadesCentroRoutingModule { }
