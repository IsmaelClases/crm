import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatosUnidadCentroComponent } from './datos-unidad-centro.component';

const routes: Routes = [
    {
        path: '',
        component: DatosUnidadCentroComponent,
        redirectTo: 'datos-unidad-centro'
    },
    {
        path: 'datos-basicos-unidad-centro',
        loadChildren: () => import('./datos-basicos-unidad-centro/datos-basicos-unidad-centro.module').then(m => m.DatosBasicosUnidadCentroModule),
        outlet: 'sidebar'
    },
    {
        path: 'datos-basicos-alumnos',
        loadChildren: () => import('./datos-basicos-alumnos/datos-basicos-alumnos.module').then(m => m.DatosBasicosAlumnosModule),
        outlet: 'sidebar'
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DatosUnidadCentroRoutingModule { }