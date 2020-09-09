import { NgModule } from '@angular/core';
import { ServicosComponent } from './servicos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServicosRouting } from './servicos.routing';
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
import { ServicosService } from './servicos.service';
import { PoDividerModule } from '@po-ui/ng-components';
import { PoLoadingModule } from '@po-ui/ng-components';
import { ServicoComponent } from './servico/servico.component';
import { PoBreadcrumbModule } from '@po-ui/ng-components';
import { PoWidgetModule } from '@po-ui/ng-components';
import { PoTableModule } from '@po-ui/ng-components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ServicosRouting,
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
    PoWidgetModule,
    PoTableModule,
  ],
  declarations: [ServicosComponent, ServicoComponent],
  providers: [ServicosService],
})
export class ServicosModule {}
