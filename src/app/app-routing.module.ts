import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  {
     path: 'home',
     loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'grupos',
    loadChildren: () => import('./grupos/grupos.module').then(m => m.GruposModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'opciones',
    loadChildren: () => import('./opciones/opciones.module').then(m => m.OpcionesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'roles',
    loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'roles-menu',
    loadChildren: () => import('./roles-menu/roles-menu.module').then(m => m.RolesMenuModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'logs',
    loadChildren: () => import('./logs/logs.module').then(m => m.LogsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'footer',
    loadChildren: () => import('./shared/footer/footer.module').then(m => m.FooterModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  { path: 'motivos-reunion', loadChildren: () => import('./motivos-reunion/motivos-reunion.module').then(m => m.MotivosReunionModule) },
  { path: 'modos-reunion', loadChildren: () => import('./modos-reunion/modos-reunion.module').then(m => m.ModosReunionModule) },
  { path: 'zonas', loadChildren: () => import('./zonas/zonas.module').then(m => m.ZonasModule) },
  { path: 'tipos-entidad', loadChildren: () => import('./tipos-entidad/tipos-entidad.module').then(m => m.TiposEntidadModule) },
  { path: 'contactos', loadChildren: () => import('./contactos/contactos.module').then(m => m.ContactosModule) },
  { path: 'entidades', loadChildren: () => import('./entidades/entidades.module').then(m => m.EntidadesModule) },
  { path: 'reuniones', loadChildren: () => import('./reuniones/reuniones.module').then(m => m.ReunionesModule) },
  { path: 'familias', loadChildren: () => import('./familias/familias.module').then(m => m.FamiliasModule) },
  { path: 'niveles', loadChildren: () => import('./niveles/niveles.module').then(m => m.NivelesModule) },
  { path: 'unidades-dual', loadChildren: () => import('./unidades-dual/unidades-dual.module').then(m => m.UnidadesDualModule) },
  { path: 'ciclos', loadChildren: () => import('./ciclos/ciclos.module').then(m => m.CiclosModule) },
//  { path: 'unidades', loadChildren: () => import('./entidades/datos-entidad/unidades/unidades.module').then(m => m.UnidadesModule) },
  { path: 'motivos-nodual', loadChildren: () => import('./motivos-nodual/motivos-nodual.module').then(m => m.MotivosNodualModule) },
  { path: 'unidades', loadChildren: () => import('./unidades/unidades.module').then(m => m.UnidadesModule) },
//  { path: 'ciclos-entidad', loadChildren: () => import('./entidades/datos-entidad/ciclos-entidad/ciclos-entidad.module').then(m => m.CiclosEntidadModule) },
//  { path: 'contactos-entidad', loadChildren: () => import('./entidades/datos-entidad/contactos-entidad/contactos-entidad.module').then(m => m.ContactosEntidadModule) },
//  { path: 'datos-basicos-entidad', loadChildren: () => import('./entidades/datos-entidad/datos-basicos-entidad/datos-basicos-entidad.module').then(m => m.DatosBasicosEntidadModule) },
//  { path: 'datos-entidad', loadChildren: () => import('./entidades/datos-entidad/datos-entidad.module').then(m => m.DatosEntidadModule) },
//  { path: 'add-asistente', loadChildren: () => import('./reuniones/datos-reunion/asistentes/add-asistente/add-asistente.module').then(m => m.AddAsistenteModule) },
  {
    path: '**',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
