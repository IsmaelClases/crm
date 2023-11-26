export interface RolMenu {
  id_rol_menu?: string;
  id_opcion_menu: string;
  id_grupo_menu: string;
  id_rol: string;
  observaciones?: string;
  opcion: string;
  accion: string;
  texto_tooltip: string;
  grupo: string;
  rol: string;
  orden: string;
  permiso_delete: string;
  permiso_post: string;
  permiso_put: string;
}
