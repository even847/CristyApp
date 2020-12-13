import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { EmpleadoModel } from '../../models/empleado.model';
import { EmpleadosService } from '../../services/empleados.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css'],
})
export class EmpleadoComponent implements OnInit {
  empleado = new EmpleadoModel();
  forma: FormGroup;

  constructor(
    private empleadosService: EmpleadosService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'nuevo') {
      this.empleadosService.getEmpleado(id).subscribe((resp: EmpleadoModel) => {
        this.empleado = resp;
        this.empleado.id = id;
      });
    }
  }


  guardar(form: NgForm) {
    if (form.invalid) {
      console.log('Formulario Invalido');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando Información',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    let peticion = new Observable<any>();

    if (this.empleado.id) {
      peticion = this.empleadosService.updateEmpleado(this.empleado);
    } else {
      peticion = this.empleadosService.createEmpleado(this.empleado);
    }

    peticion.subscribe((resp) => {
      Swal.fire({
        title: `Los datos del empelado: ${this.empleado.nombreUno} ${this.empleado.apellidoUno}`,
        text: 'Se Cargarón correctamente',
        icon: 'success',
      });
    });
  }
}
