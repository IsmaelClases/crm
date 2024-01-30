import { Injectable } from '@angular/core';
import { Alumno } from '../shared/interfaces/alumno';
import { ApiResponse } from '../shared/interfaces/api-response';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../shared/common.service';
import { URL_API } from 'src/environments/environment';

const ENDPOINT = 'alumnos';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  alumnos: Alumno[];
  alumno: Alumno;

  constructor(private http: HttpClient, private commonService: CommonService) { }

  setAlumno(alumno: Alumno) {
    this.alumno = alumno;
  }

  setDatosBasicosAlumno(formAlumno: any) {
    this.alumno.id = formAlumno.id;
    this.alumno.nombre = formAlumno.nombre;
    this.alumno.apellidos = formAlumno.apellidos;
    this.alumno.fecha_nacimiento = formAlumno.fecha_nacimiento;
    this.alumno.linkedin = formAlumno.linkedin;
    this.alumno.nivel_ingles = formAlumno.nivel_ingles;
    this.alumno.minusvalia = formAlumno.minusvalia;
    this.alumno.otra_formacion = formAlumno.otra_formacion;
    this.alumno.centro_actual = formAlumno.centro_actual;
  }

  // Obtener todos los alumnos
  get(idCentro: string) {
    return this.http.get<ApiResponse>(`${URL_API}/${ENDPOINT}.php?centro_actual=${idCentro}`, { headers: this.commonService.headers });
  }

  // Añadir un nuevo alumno
  addAlumno(alumno: Alumno) {
    const body = JSON.stringify(alumno);
    return this.http.post<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  // Editar un alumno existente
  editAlumno(alumno: Alumno) {
    const body = JSON.stringify(alumno);
    return this.http.put<ApiResponse>(`${URL_API}/${ENDPOINT}.php`, body, { headers: this.commonService.headers });
  }

  // Eliminar un alumno por su ID
  deleteAlumno(id: string) {
    return this.http.delete<ApiResponse>(`${URL_API}/${ENDPOINT}.php?id_alumno=${id}`, { headers: this.commonService.headers });
  }
}
