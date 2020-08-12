import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendamentosComponent } from './agendamentos.component';

const routes: Routes = [{ path: '', component: AgendamentosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgendamentosRouting {}
