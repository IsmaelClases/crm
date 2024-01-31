// linkedin-url.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'linkedinUrl'
})
export class LinkedinUrlPipe implements PipeTransform {
  transform(value: string): boolean {
    // Expresión regular para validar una URL de LinkedIn
    const linkedinUrlPattern = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/;
    
    // Devuelve true si la cadena cumple con el patrón de URL de LinkedIn, de lo contrario, devuelve false
    return linkedinUrlPattern.test(value);
  }
}