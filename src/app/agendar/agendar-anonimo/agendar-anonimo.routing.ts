import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendarAnonimoComponent } from './agendar-anonimo.component';

const routes: Routes = [{ path: '', component: AgendarAnonimoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgendarAnonimoRouting {}
