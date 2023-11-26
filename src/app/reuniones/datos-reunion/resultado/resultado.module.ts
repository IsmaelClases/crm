import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultadoRoutingModule } from './resultado-routing.module';
import { ResultadoComponent } from './resultado.component';
import { CrudMaterialModule } from '../../../modules/crud-material/crud-material.module';
import { AngularEditorModule } from '@kolkov/angular-editor';


@NgModule({
  declarations: [ResultadoComponent],
  imports: [
    CommonModule,
    ResultadoRoutingModule,
    CrudMaterialModule,
    AngularEditorModule
  ]
})
export class ResultadoModule { }
