import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedefinirComponent } from './redefinir.component';

const routes: Routes = [{ path: '', component: RedefinirComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RedefinirRouting {}
