import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioRegistroModel } from '../../models/usuarioRegistro.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  formRegistro: FormGroup;
  usuario: UsuarioRegistroModel;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.usuario = new UsuarioRegistroModel();
   }

  ngOnInit(): void {
  }

  crearFormularioRegistro(): void {
    this.formRegistro = this.formBuilder.group({
      emailRegistro: ['', [Validators.required, Validators.email]],
      nombreRegistro: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      contraseniaRegistro: ['', [Validators.required, ]]
    });
  }

  guardarRegistro(): any {

  }

}
