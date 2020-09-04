import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PoPageModule, PoDividerModule } from '@po-ui/ng-components';
import { PoButtonModule } from '@po-ui/ng-components';
import { PoFieldModule } from '@po-ui/ng-components';
import { PoCalendarModule } from '@po-ui/ng-components';
import { PoNotificationModule } from '@po-ui/ng-components';
import { AgendarService } from '../agendar.service';
import { PoBreadcrumbModule } from '@po-ui/ng-components';
import { ServicosService } from '../../servicos/servicos.service';
import { ExpedienteService } from '../../expediente/expediente.service';
import { AgendarAnonimoComponent } from './agendar-anonimo.component';
import { AgendarAnonimoRouting } from './agendar-anonimo.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AgendarAnonimoRouting,
    PoPageModule,
    PoButtonModule,
    ReactiveFormsModule,
    PoFieldModule,
    PoCalendarModule,
    PoNotificationModule,
    PoBreadcrumbModule,
    PoDividerModule,
  ],
  declarations: [AgendarAnonimoComponent],
  providers: [AgendarService, ServicosService, ExpedienteService],
})
export class AgendarAnonimoModule {}
