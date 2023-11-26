import { Reunion } from './reunion';
import { Asistente } from './asistente';
import { Contacto } from './contacto';
import { Entidad } from './entidad';
import { ModoReunion } from './modo-reunion';
import { MotivoReunion } from './motivo-reunion';
import { Zona } from './zona';

export interface DatosEditarReunion {
    reunion: Reunion;
    asistentes: Asistente[];
    contactos: Contacto[];
    entidades: Entidad[];
    modosReunion: ModoReunion[];
    motivosReunion: MotivoReunion[];
    zonas: Zona[];

}
