export class EmpleadoModel {
  id: string;
  nombreUno: string;
  nombreDos: string;
  apellidoUno: string;
  apellidoDos: string;
  direccion: string;
  correo: string;
  tlfCelular: string;
  tlfCasa: string;
  casoEmergencia: string;
  numEmergencia: string;
  fechaIngreso: Date;
  fechaEgreso: Date;
  estado: {
    activo: string;
    inactivo: string;
    vacaciones: string;
    licencia: string
  };

  constructor() {

  }
}
