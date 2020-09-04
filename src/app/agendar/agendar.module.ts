import { NgModule } from '@angular/core';
import { AgendarComponent } from './agendar.component';
import { AgendaComponent } from './agenda/agenda.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AgendarRouting } from './agendar.routing';
import { PoPageModule, PoDividerModule } from '@po-ui/ng-components';
import { PoButtonModule } from '@po-ui/ng-components';
import { PoFieldModule } from '@po-ui/ng-components';
import { PoCalendarModule } from '@po-ui/ng-components';
import { PoNotificationModule } from '@po-ui/ng-components';
import { AgendarService } from './agendar.service';
import { PoBreadcrumbModule } from '@po-ui/ng-components';
import { ServicosService } from '../servicos/servicos.service';
import { DadosService } from '../dados/dados.service';
import { ExpedienteService } from '../expediente/expediente.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AgendarRouting,
    PoPageModule,
    PoButtonModule,
    ReactiveFormsModule,
    PoFieldModule,
    PoCalendarModule,
    PoNotificationModule,
    PoBreadcrumbModule,
    PoDividerModule,
  ],
  declarations: [AgendarComponent, AgendaComponent],
  providers: [AgendarService, ServicosService, DadosService, ExpedienteService],
})
export class AgendarModule {}
