import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { VacantesAlumnosComponent } from "./vacantes-alumnos.component";

const routes: Routes = [
  {path: '', component: VacantesAlumnosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VacantesAlumnosRoutingModule { }
