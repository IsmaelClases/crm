import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnidadesCentroRoutingModule } from './unidades-centro-routing.module';
import { UnidadesCentroComponent } from './unidades-centro.component';
import { AddUnidadesCentroComponent } from './add-unidades-centro/add-unidades-centro.component';
import { EditUnidadesCentroComponent } from './edit-unidades-centro/edit-unidades-centro.component';
import { DeleteUnidadesCentroComponent } from './delete-unidades-centro/delete-unidades-centro.component';
import { CrudMaterialModule } from '../modules/crud-material/crud-material.module';
import { DatosUnidadCentroModule } from './datos-unidad-centro/datos-unidad-centro.module';

@NgModule({
  declarations: [
    UnidadesCentroComponent,
    AddUnidadesCentroComponent,
    EditUnidadesCentroComponent,
    DeleteUnidadesCentroComponent
  ],
  imports: [
    CommonModule,
    UnidadesCentroRoutingModule,
    CrudMaterialModule,
    DatosUnidadCentroModule
  ],
  entryComponents: [
    AddUnidadesCentroComponent,
    EditUnidadesCentroComponent,
    DeleteUnidadesCentroComponent
  ]
})
export class UnidadesCentroModule { }
