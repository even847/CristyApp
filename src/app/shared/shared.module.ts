import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { SharedRoutingModule } from './shared-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';


@NgModule({
  declarations: [
    NavbarComponent,
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    NavbarComponent,
    LoginComponent,
    RegistroComponent
  ]
})
export class SharedModule { }
