import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObjetivoRoutingModule } from './objetivo-routing.module';
import { ObjetivoComponent } from './objetivo.component';
import { CrudMaterialModule } from '../../../modules/crud-material/crud-material.module';
import { AngularEditorModule } from '@kolkov/angular-editor';


@NgModule({
  declarations: [ObjetivoComponent],
  imports: [
    CommonModule,
    ObjetivoRoutingModule,
    CrudMaterialModule,
    AngularEditorModule
  ]
})
export class ObjetivoModule { }
