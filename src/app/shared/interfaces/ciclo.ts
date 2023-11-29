export interface Ciclo {
	id_ciclo: number;
	ciclo: string;
	cod_ciclo: string;
	id_nivel: number;
	id_familia: number;
	observaciones?: any;

	fk_nivel: string;
	fk_familia: string;
  }
  