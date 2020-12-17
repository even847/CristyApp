
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmpleadoModel } from '../models/empleado.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmpleadosService {
  private url = 'https://cristyapp-d2067-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) {}

  createEmpleado(empleadoIn: EmpleadoModel): Observable<EmpleadoModel> {
    return this.http.post(`${this.url}/empleados.json`, empleadoIn).pipe(
      map((resp: any) => {
        empleadoIn.id = resp.name;
        return empleadoIn;
      })
    );
  }

  updateEmpleado(empleado: EmpleadoModel): Observable<object> {
    const empleadoTemp = {
      ... empleado,
    };

    delete empleadoTemp.id;
    return this.http.put(
      `${this.url}/empleados/${empleado.id}.json`,
      empleadoTemp
    );
  }

  deleteEmpleado(id: string): any {
    return this.http.delete(`${this.url}/empleados/${id}.json`);
  }

  getEmpleado(id: string): Observable<EmpleadoModel> {
    return this.http.get<EmpleadoModel>(`${this.url}/empleados/${id}.json`);
  }

  getEmpleados(): Observable<EmpleadoModel[]> {
    return this.http
      .get(`${this.url}/empleados.json`)
      .pipe(map(this.crearArreglo));
  }

  private crearArreglo(empleadoObj: object): EmpleadoModel[] {
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
