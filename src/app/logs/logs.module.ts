import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogsRoutingModule } from './logs-routing.module';
import { LogsComponent } from './logs.component';
import { CrudMaterialModule } from '../modules/crud-material/crud-material.module';

@NgModule({
  declarations: [LogsComponent],
  imports: [
    CommonModule,
    LogsRoutingModule,
    CrudMaterialModule
  ]
})
export class LogsModule { }
