import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import {
  AutenticacaoGuard,
  AdminAutenticacaoGuard,
} from './core/guard/auth.guard.service';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./registrar/registrar.module').then((m) => m.RegistrarModule),
  },
  {
    path: 'reset',
    loadChildren: () =>
      import('./redefinir/redefinir.module').then((m) => m.RedefinirModule),
  },
  {
    path: 'schedule-anonymous',
    loadChildren: () =>
      import('./agendar/agendar-anonimo/agendar-anonimo.module').then(
        (m) => m.AgendarAnonimoModule
      ),
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
        path: 'schedule',
        canActivate: [AutenticacaoGuard],
        loadChildren: () =>
          import('./agendar/agendar.module').then((m) => m.AgendarModule),
      },
      {
        path: 'schedule/:email/:id',
        canActivate: [AutenticacaoGuard],
        loadChildren: () =>
          import('./agendar/agendar.module').then((m) => m.AgendarModule),
      },
      {
        path: 'data',
        canActivate: [AutenticacaoGuard],
        loadChildren: () =>
          import('./dados/dados.module').then((m) => m.DadosModule),
      },
      {
        path: 'schedules',
        canActivate: [AdminAutenticacaoGuard],
        loadChildren: () =>
          import('./agendamentos/agendamentos.module').then(
            (m) => m.AgendamentosModule
          ),
      },
      {
        path: 'services',
        canActivate: [AdminAutenticacaoGuard],
        loadChildren: () =>
          import('./servicos/servicos.module').then((m) => m.ServicosModule),
      },
      {
        path: 'services/new',
        canActivate: [AdminAutenticacaoGuard],
        loadChildren: () =>
          import('./servicos/servicos.module').then((m) => m.ServicosModule),
      },
      {
        path: 'services/edit/:id',
        canActivate: [AdminAutenticacaoGuard],
        loadChildren: () =>
          import('./servicos/servicos.module').then((m) => m.ServicosModule),
      },
      {
        path: 'users',
        canActivate: [AdminAutenticacaoGuard],
        loadChildren: () =>
          import('./usuarios/usuarios.module').then((m) => m.UsuariosModule),
      },
      {
        path: 'users/new',
        canActivate: [AdminAutenticacaoGuard],
        loadChildren: () =>
          import('./usuarios/usuarios.module').then((m) => m.UsuariosModule),
      },
      {
        path: 'users/edit/:id',
        canActivate: [AdminAutenticacaoGuard],
        loadChildren: () =>
          import('./usuarios/usuarios.module').then((m) => m.UsuariosModule),
      },
      {
        path: 'expedient',
        canActivate: [AdminAutenticacaoGuard],
        loadChildren: () =>
          import('./expediente/expediente.module').then(
            (m) => m.ExpedienteModule
          ),
      },
      {
        path: 'store-data',
        canActivate: [AdminAutenticacaoGuard],
        loadChildren: () =>
          import('./loja-dados/loja-dados.module').then(
            (m) => m.LojaDadosModule
          ),
      },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
