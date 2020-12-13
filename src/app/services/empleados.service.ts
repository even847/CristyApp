<<<<<<< HEAD
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmpleadoModel } from '../models/empleado.model';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  constructor(
    private http: HttpClient
  )
  { }

  crearEmpleado( empleado: EmpleadoModel ) { }
}
=======
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmpleadoModel } from '../models/empleado.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmpleadosService {
  private url = 'https://cristyapp-d2067-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) {}

  createEmpleado(empleado: EmpleadoModel) {
    return this.http.post(`${this.url}/empleados.json`, empleado).pipe(
      map((resp: any) => {
        empleado.id = resp.name;
        return empleado;
      })
    );
  }

  updateEmpleado(empleado: EmpleadoModel) {
    const empleadoTemp = {
      ...empleado,
    };

    delete empleadoTemp.id;
    return this.http.put(
      `${this.url}/empleados/${empleado.id}.json`,
      empleadoTemp
    );
  }

  deleteEmpleado(id: string) {
    return this.http.delete(`${this.url}/empleados/${id}.json`);
  }

  getEmpleado(id: string) {
    return this.http.get(`${this.url}/empleados/${id}.json`);
  }

  getEmpleados() {
    return this.http
      .get(`${this.url}/empleados.json`)
      .pipe(map(this.crearArreglo));
  }

  private crearArreglo(empleadoObj: object) {
    const empleados: EmpleadoModel[] = [];

    console.log(empleadoObj);
    if (empleadoObj === null) {
      return [];
    }

    Object.keys(empleadoObj).forEach((key) => {
      const empleado: EmpleadoModel = empleadoObj[key];
      empleado.id = key;
      empleados.push(empleado);
    });
    return empleados;
  }
}
>>>>>>> 639a6edc7b47604dad98a70cce850305b8d8f0db
