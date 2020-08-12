import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DadosComponent } from './dados.component';

const routes: Routes = [{ path: '', component: DadosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DadosRouting {}
