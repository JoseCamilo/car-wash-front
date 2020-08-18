import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import {
  AutenticacaoGuard,
  AdminAutenticacaoGuard,
} from './core/guard/auth.guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'registrar',
    loadChildren: () =>
      import('./registrar/registrar.module').then((m) => m.RegistrarModule),
  },
  {
    path: 'redefinir',
    loadChildren: () =>
      import('./redefinir/redefinir.module').then((m) => m.RedefinirModule),
  },
  {
    path: '',
    component: MenuComponent,
    children: [
      {
        path: 'home',
        canActivate: [AutenticacaoGuard],
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'agendar',
        canActivate: [AutenticacaoGuard],
        loadChildren: () =>
          import('./agendar/agendar.module').then((m) => m.AgendarModule),
      },
      {
        path: 'dados',
        canActivate: [AutenticacaoGuard],
        loadChildren: () =>
          import('./dados/dados.module').then((m) => m.DadosModule),
      },
      {
        path: 'agendamentos',
        canActivate: [AdminAutenticacaoGuard],
        loadChildren: () =>
          import('./agendamentos/agendamentos.module').then(
            (m) => m.AgendamentosModule
          ),
      },
      {
        path: 'servicos',
        canActivate: [AdminAutenticacaoGuard],
        loadChildren: () =>
          import('./servicos/servicos.module').then((m) => m.ServicosModule),
      },
      {
        path: 'servicos/item',
        canActivate: [AdminAutenticacaoGuard],
        loadChildren: () =>
          import('./servicos/servicos.module').then((m) => m.ServicosModule),
      },
      {
        path: 'servicos/item/:id',
        canActivate: [AdminAutenticacaoGuard],
        loadChildren: () =>
          import('./servicos/servicos.module').then((m) => m.ServicosModule),
      },
      {
        path: 'usuarios',
        canActivate: [AdminAutenticacaoGuard],
        loadChildren: () =>
          import('./usuarios/usuarios.module').then((m) => m.UsuariosModule),
      },
      {
        path: 'usuarios/item',
        canActivate: [AdminAutenticacaoGuard],
        loadChildren: () =>
          import('./usuarios/usuarios.module').then((m) => m.UsuariosModule),
      },
      {
        path: 'usuarios/item/:id',
        canActivate: [AdminAutenticacaoGuard],
        loadChildren: () =>
          import('./usuarios/usuarios.module').then((m) => m.UsuariosModule),
      },
      {
        path: 'expediente',
        canActivate: [AdminAutenticacaoGuard],
        loadChildren: () =>
          import('./expediente/expediente.module').then(
            (m) => m.ExpedienteModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
