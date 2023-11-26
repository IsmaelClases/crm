export interface Contacto {
    id_contacto?: number;
    id_tipo_contacto: number;
    nombre: string;
    apellidos: string;
    email: string;
    corporativo_largo: string;
    corporativo_corto: string;
    telefono_personal: string;
    id_zona: number;
    id_entidad: number;
    cargo: string;
    id_familia: number;
    direccion: string;
    cp: string;
    localidad: string;
    id_provincia: number;
    observaciones: string;

    nombre_completo: string;
    direccion_completa: string;
    entidad: string;
    tipo_contacto: string;
    familia: string;
}
