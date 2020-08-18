import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { AutenticacaoGuard } from './core/guard/auth.guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
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
    canActivateChild: [AutenticacaoGuard],
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'agendar',
        loadChildren: () =>
          import('./agendar/agendar.module').then((m) => m.AgendarModule),
      },
      {
        path: 'dados',
        loadChildren: () =>
          import('./dados/dados.module').then((m) => m.DadosModule),
      },
      {
        path: 'agendamentos',
        loadChildren: () =>
          import('./agendamentos/agendamentos.module').then(
            (m) => m.AgendamentosModule
          ),
      },
      {
        path: 'servicos',
        loadChildren: () =>
          import('./servicos/servicos.module').then((m) => m.ServicosModule),
      },
      {
        path: 'servicos/item',
        loadChildren: () =>
          import('./servicos/servicos.module').then((m) => m.ServicosModule),
      },
      {
        path: 'servicos/item/:id',
        loadChildren: () =>
          import('./servicos/servicos.module').then((m) => m.ServicosModule),
      },
      {
        path: 'expediente',
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
