import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'edadAlumno'
})
export class EdadAlumnoPipe implements PipeTransform {
  transform(fechaNacimiento: any): number {
    if (!fechaNacimiento) {
      return null;
    }

    // Convertir la cadena a un objeto Date
    const fechaNacimientoDate = new Date(fechaNacimiento);

    if (isNaN(fechaNacimientoDate.getTime())) {
      return null;
    }

    const fechaActual = new Date();

    const anioActual = fechaActual.getFullYear();
    const anioNacimiento = fechaNacimientoDate.getFullYear();

    const diferenciaAnios = anioActual - anioNacimiento;

    const mesActual = fechaActual.getMonth() + 1;
    const mesNacimiento = fechaNacimientoDate.getMonth() + 1;

    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && fechaActual.getDate() < fechaNacimientoDate.getDate())) {
      return diferenciaAnios - 1;
    }

    return diferenciaAnios;
  }
}
