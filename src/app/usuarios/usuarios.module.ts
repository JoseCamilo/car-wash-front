import { NgModule } from '@angular/core';
import { UsuariosComponent } from './usuarios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuariosRouting } from './usuarios.routing';
import { PoPageModule } from '@po-ui/ng-components';
import { PoListViewModule } from '@po-ui/ng-components';
import { PoInfoModule } from '@po-ui/ng-components';
import { PoTagModule } from '@po-ui/ng-components';
import { PoButtonModule } from '@po-ui/ng-components';
import { PoModalModule } from '@po-ui/ng-components';
import { PoFieldModule } from '@po-ui/ng-components';
import { PoCalendarModule } from '@po-ui/ng-components';
import { PoNotificationModule } from '@po-ui/ng-components';
import { PoTooltipModule } from '@po-ui/ng-components';
import { UsuariosService } from './usuarios.service';
import { PoDividerModule } from '@po-ui/ng-components';
import { PoLoadingModule } from '@po-ui/ng-components';
import { PoBreadcrumbModule } from '@po-ui/ng-components';
import { UsuarioComponent } from './usuario/usuario.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsuariosRouting,
    PoPageModule,
    PoListViewModule,
    PoInfoModule,
    PoTagModule,
    PoButtonModule,
    PoModalModule,
    ReactiveFormsModule,
    PoFieldModule,
    PoCalendarModule,
    PoNotificationModule,
    PoTooltipModule,
    PoDividerModule,
    PoLoadingModule,
    PoBreadcrumbModule,
    SharedModule,
  ],
  declarations: [UsuariosComponent, UsuarioComponent],
  providers: [UsuariosService],
})
export class UsuariosModule {}
