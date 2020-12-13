import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { ComponentsRoutingModule } from './components-routing.module';

import { HomeComponent } from './home/home.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { EmpleadoComponent } from './empleado/empleado.component';


@NgModule({
  declarations: [
    HomeComponent,
    EmpleadosComponent,
    EmpleadoComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    FormsModule
  ],
  exports: [
    ComponentsRoutingModule,
    FormsModule

  ]
})
export class ComponentsModule { }