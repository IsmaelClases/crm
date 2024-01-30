import { Alumno } from "./alumno";
import { UnidadesCentro } from "./unidades-centro";


export interface DatosEditarUnidadCentro {
    unidadCentro: UnidadesCentro,
    alumnos: Alumno[]
}
