export interface Asistente {
    id_asistente?: number;
    id_reunion: number;
    id_contacto: number;
    observaciones?: string;

    cargo?: string;
    nombre_completo?: string;
    direccion_completa?: string;
    entidad?: string;
}
