import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DatosBasicosUnidadCentroComponent } from './datos-basicos-unidad-centro.component';


const routes: Routes = [{
    path: '',
    component: DatosBasicosUnidadCentroComponent
}]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DatosBasicosUnidadCentroRoutingModule { }