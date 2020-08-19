import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LojaDadosComponent } from './loja-dados.component';

const routes: Routes = [{ path: '', component: LojaDadosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LojaDadosRouting {}
