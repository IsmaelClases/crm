export interface Unidad {
	id_unidad: number;
	id_entidad: number;
	id_ciclo: number;
	unidad: string;
	plazas: number;
	id_unidad_dual: number;
	id_motivo_nodual?: number;

	fk_entidad: string;
	fk_ciclo: string;
	fk_unidad_dual: string;
	fk_motivo_nodual?: string;

	id_zona: number;
	fk_zona: string;
	id_provincia?: number;
	fk_provincia?: string;
	id_tipo_entidad: number;
	fk_tipo_entidad:string;

	observaciones?: any;
  }
  