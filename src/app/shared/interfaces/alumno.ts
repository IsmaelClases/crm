export enum NivelIngles {
    A1 = 'A1',
    A2 = 'A2',
    B1 = 'B1',
    B2 = 'B2',
    C1 = 'C1',
    C2 = 'C2',
}

export interface Alumno {
    id: string;
    nombre: string;
    apellidos: string;
    fecha_nacimiento: string;
    linkedin: string;
    nivel_ingles: NivelIngles;
    minusvalia: number;
    otra_formacion: string;
    centro_actual: number;
}
