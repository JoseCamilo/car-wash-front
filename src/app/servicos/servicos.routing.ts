import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicosComponent } from './servicos.component';
import { ServicoComponent } from './servico/servico.component';

const routes: Routes = [
  { path: '', component: ServicosComponent },
  { path: 'new', component: ServicoComponent },
  { path: 'edit/:id', component: ServicoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicosRouting {}
