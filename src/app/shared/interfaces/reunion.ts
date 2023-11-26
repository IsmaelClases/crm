export interface Reunion {
    id_reunion?: number;
    id_contacto: number;
    reunion: string;
    id_modo_reunion: number;
    id_motivo_reunion: number;
    id_entidad_target: number;
    id_zona: number;
    objetivo: string;
    resultado: string;
    fecha: string;
    hora_inicio: string;
    hora_fin: string;
    ubicacion: string;
    localidad: string;
    observaciones: string;

    fk_modo_reunion: string;
    fk_motivo_reunion: string;
    fk_entidad_target: string;
    fk_zona: string;
    fk_contacto: string;
}
