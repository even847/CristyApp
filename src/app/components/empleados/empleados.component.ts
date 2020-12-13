import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { EmpleadoModel } from '../../models/empleado.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  empleados: EmpleadoModel[];
  cargando: boolean;

  constructor( private empleadosService: EmpleadosService) {
    this.empleados = [];
  }

  ngOnInit(): void {
    this.cargando = true;
    this.empleadosService.getEmpleados().subscribe(
      resp => {
        this.empleados = resp;
        this.cargando = false;
      });
  }

  deleteEmpleado(empelado: EmpleadoModel, i: number) {

    Swal.fire({
      title: '<strong>¿Esta Seguro?</strong>',
      text: `Que Desea Borrar al Empleado ${empelado.nombreUno} ${empelado.apellidoUno}`,
      icon: 'warning',
      // showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar'
    }).then( resp => {
      if (resp.value) {
        this.empleados.splice(i, 1);
        this.empleadosService.deleteEmpleado(empelado.id).subscribe();
      }
    });

  }
}
