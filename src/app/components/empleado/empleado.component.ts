import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmpleadoModel } from '../../models/empleado.model';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {

  empleado = new EmpleadoModel();

  constructor() { }

  ngOnInit(): void {
  }

  guardar(form: NgForm) {
    console.log(form);
    console.log(this.empleado);

  }

}
