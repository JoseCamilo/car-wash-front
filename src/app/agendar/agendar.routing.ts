import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendarComponent } from './agendar.component';
import { AgendaComponent } from './agenda/agenda.component';

const routes: Routes = [
  { path: '', component: AgendarComponent },
  { path: ':email/:id', component: AgendaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgendarRouting {}
