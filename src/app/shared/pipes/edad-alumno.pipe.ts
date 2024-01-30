import { PipeTransform } from "@angular/core";

export class EdadAlumnoPipe implements PipeTransform{
  transform(fecha: Date): number {

    return 3
  }
}
