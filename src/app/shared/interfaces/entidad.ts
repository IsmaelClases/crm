export interface Entidad {
    id_entidad?: number;
    entidad: string;
    id_zona: number;
    id_contacto: number;
    id_tipo_entidad: number;
    direccion: string;
    cp: string;
    localidad: string;
    id_provincia: number;
    telefono: string;
    email: string;
    web: string;
    codigo: string;
    observaciones: string;

    fk_zona: string;
    fk_tipo_entidad: string;
    fk_contacto: string;

    checked?: boolean;

}
