import { Contacto } from './contacto';
import { Entidad } from './entidad';
import { Zona } from './zona';
import { TipoEntidad } from './tipo-entidad';
import { Provincia } from './provincia';

export interface DatosEditarEntidad {
    entidad: Entidad;
    contactos: Contacto[];
    tiposEntidad: TipoEntidad[];
    provincias: Provincia[];
    zonas: Zona[];

}
