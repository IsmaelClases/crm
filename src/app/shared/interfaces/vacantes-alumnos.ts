export interface VacantesAlumnos {
  id_vacante: number;
  id_entidad: number;
  entidad: string;
  id_unidad_centro: number;
  num_alumnos: number;
  alumnos_asignados: string | null;
}
