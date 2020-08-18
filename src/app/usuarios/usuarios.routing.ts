import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios.component';
import { UsuarioComponent } from './usuario/usuario.component';

const routes: Routes = [
  { path: '', component: UsuariosComponent },
  { path: 'item', component: UsuarioComponent },
  { path: 'item/:id', component: UsuarioComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosRouting {}
