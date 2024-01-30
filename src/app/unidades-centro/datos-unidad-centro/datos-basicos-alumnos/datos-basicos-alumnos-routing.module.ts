import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatosBasicosAlumnosComponent } from './datos-basicos-alumnos.component';

const routes: Routes = [{
    path: '',
    component: DatosBasicosAlumnosComponent
}]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DatosBasicosAlumnosRoutingModule { }