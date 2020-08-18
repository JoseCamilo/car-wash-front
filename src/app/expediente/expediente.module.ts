import { NgModule } from '@angular/core';
import { ExpedienteComponent } from './expediente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExpedienteRouting } from './expediente.routing';
import { PoPageModule } from '@po-ui/ng-components';
import { PoButtonModule } from '@po-ui/ng-components';
import { PoFieldModule } from '@po-ui/ng-components';
import { PoNotificationModule } from '@po-ui/ng-components';
import { ExpedienteService } from './expediente.service';
import { PoLoadingModule } from '@po-ui/ng-components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ExpedienteRouting,
    PoPageModule,
    PoButtonModule,
    ReactiveFormsModule,
    PoFieldModule,
    PoNotificationModule,
    PoLoadingModule,
  ],
  declarations: [ExpedienteComponent],
  providers: [ExpedienteService],
})
export class ExpedienteModule {}
