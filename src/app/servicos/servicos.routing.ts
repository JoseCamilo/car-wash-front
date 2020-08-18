import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicosComponent } from './servicos.component';
import { ServicoComponent } from './servico/servico.component';

const routes: Routes = [
  { path: '', component: ServicosComponent },
  { path: 'item', component: ServicoComponent },
  { path: 'item/:id', component: ServicoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicosRouting {}
