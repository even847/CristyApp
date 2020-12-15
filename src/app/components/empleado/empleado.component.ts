import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { EmpleadoModel } from '../../models/empleado.model';
import { EmpleadosService } from '../../services/empleados.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css'],
})
export class EmpleadoComponent implements OnInit {
  empleado: EmpleadoModel;
  forma: FormGroup;

  constructor(
    private empleadosService: EmpleadosService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.crearFormulario();
    this.empleado = new EmpleadoModel();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.forma.patchValue({ id });

    if (id !== 'nuevo') {
      this.empleadosService.getEmpleado(id).subscribe((resp: EmpleadoModel) => {
        this.empleado = resp;
        this.empleado.id = id;
        this.cargarFormulario(this.empleado);
      });
    }
  }

  get nombreUnoNoValido(): boolean {
    return this.forma.get('nombreUno').invalid && this.forma.get('nombreUno').touched;
  }

  get apellidoUnoNoValido(): boolean {
    return this.forma.get('apellidoUno').invalid && this.forma.get('apellidoUno').touched;
  }

  get direccionNoValida(): boolean {
    return this.forma.get('direccion').invalid && this.forma.get('direccion').touched;
  }

  get correoNoValido(): boolean {
    return this.forma.get('correo').invalid && this.forma.get('correo').touched;
  }

  get tlfCelularNoValido(): boolean {
    return this.forma.get('tlfCelular').invalid && this.forma.get('tlfCelular').touched;
  }

  get casoEmergenciaNoValido(): boolean {
    return this.forma.get('casoEmergencia').invalid && this.forma.get('casoEmergencia').touched;
  }

  get numEmergenciaNoValido(): boolean {
    return this.forma.get('casoEmergencia').invalid && this.forma.get('casoEmergencia').touched;
  }

  get fechaIngresoNoValido(): boolean {
    return this.forma.get('fechaIngreso').invalid && this.forma.get('fechaIngreso').touched;
  }

  crearFormulario(): void {
    this.forma = this.formBuilder.group({
      id: new FormControl({ value: '', disabled: true }),
      nombreUno: [null, [Validators.pattern('[a-zA-Z ]*'), Validators.required, Validators.minLength(3)] ],
      nombreDos: [''],
      apellidoUno: ['', [Validators.pattern('[a-zA-Z ]*'), Validators.required, Validators.minLength(3)]],
      apellidoDos: [''],
      direccion: ['', [Validators.required, Validators.minLength(15)]],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      tlfCelular: ['', [Validators.required, Validators.minLength(10), Validators.pattern('-|[0-9]+')]],
      tlfCasa: ['', [Validators.pattern('[-|[0-9]+]'), Validators.required]],
      casoEmergencia: ['', [Validators.required, Validators.minLength(10)]],
      numEmergencia: ['', [Validators.pattern('[-|[0-9]+]'), Validators.required, Validators.minLength(10)]],
      fechaIngreso: ['', Validators.required],
      fechaEgreso: [''],
      estado: ['Activo', Validators.required],
    });
  }

  cargarFormulario(empleado: EmpleadoModel): void {
    this.forma.patchValue({
      nombreUno: empleado.nombreUno,
      nombreDos: empleado.nombreDos,
      apellidoUno: empleado.apellidoUno,
      apellidoDos: empleado.apellidoDos,
      direccion: empleado.direccion,
      correo: empleado.correo,
      tlfCelular: empleado.tlfCelular,
      tlfCasa: empleado.tlfCasa,
      casoEmergencia: empleado.casoEmergencia,
      numEmergencia: empleado.numEmergencia,
      fechaIngreso: empleado.fechaIngreso,
      fechaEgreso: empleado.fechaEgreso,
      estado: empleado.estado,
    });
  }

  guardar(): void {
    if (this.forma.invalid) {
      this.forma.markAllAsTouched();
    } else {
      Swal.fire({
        title: 'Espere',
        text: 'Guardando Información',
        icon: 'info',
        allowOutsideClick: false,
      });

      Swal.showLoading();

      if (this.empleado.id) {
        this.enviarModificarEmpleado();
      } else {
        this.enviarCrearEmpleado();
      }
    }
  }

  crearObjEmpleado(): EmpleadoModel {
    return {
      ... new EmpleadoModel(),
      id: this.forma.get('id').value,
      nombreUno: this.forma.get('nombreUno').value,
      nombreDos: this.forma.get('nombreDos').value,
      apellidoUno: this.forma.get('apellidoUno').value,
      apellidoDos: this.forma.get('apellidoDos').value,
      direccion: this.forma.get('direccion').value,
      correo: this.forma.get('correo').value,
      tlfCelular: this.forma.get('tlfCelular').value,
      tlfCasa: this.forma.get('tlfCasa').value,
      casoEmergencia: this.forma.get('casoEmergencia').value,
      numEmergencia: this.forma.get('numEmergencia').value,
      fechaIngreso: this.forma.get('fechaIngreso').value,
      fechaEgreso: this.forma.get('fechaEgreso').value,
      estado: this.forma.get('estado').value,
    };
  }

  modificarObjEmpleado(empleadoModificar: EmpleadoModel): EmpleadoModel {
    return {
      ...empleadoModificar,
      nombreUno: this.forma.get('nombreUno').value,
      nombreDos: this.forma.get('nombreDos').value,
      apellidoUno: this.forma.get('apellidoUno').value,
      apellidoDos: this.forma.get('apellidoDos').value,
      direccion: this.forma.get('direccion').value,
      correo: this.forma.get('correo').value,
      tlfCelular: this.forma.get('tlfCelular').value,
      tlfCasa: this.forma.get('tlfCasa').value,
      casoEmergencia: this.forma.get('casoEmergencia').value,
      numEmergencia: this.forma.get('numEmergencia').value,
      fechaIngreso: this.forma.get('fechaIngreso').value,
      fechaEgreso: this.forma.get('fechaEgreso').value,
      estado: this.forma.get('estado').value,
    };
  }

  mostrarSwal(nombreHtml?: string, apellidoHtml?: string, mensaje?: string): void {
    Swal.fire({
      title: `Los datos del empelado: ${nombreHtml} ${apellidoHtml}`,
      text: mensaje,
      icon: 'success',
    }).then(() =>
      // this.forma.reset()
      this.router.navigate(['/empleados'])
    );
  }

  enviarModificarEmpleado(): void {
    const empleadoModificado = this.modificarObjEmpleado(this.empleado);
    this.empleadosService.updateEmpleado(empleadoModificado).subscribe((desdeBD: EmpleadoModel) => {
      this.mostrarSwal(desdeBD.nombreUno, desdeBD.apellidoUno, 'Se Han Modificó correctamente');
    });
  }

  enviarCrearEmpleado(): void {
    const newEmpleado = this.crearObjEmpleado();
    this.empleadosService.createEmpleado(newEmpleado).subscribe((desdeBD: EmpleadoModel) => {
      this.mostrarSwal(desdeBD.nombreUno, desdeBD.apellidoUno, 'Se Cargarón correctamente');
    });
  }
}
