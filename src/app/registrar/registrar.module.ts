import { NgModule } from '@angular/core';
import { RegistrarComponent } from './registrar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistrarService } from './registrar.service';
import {
  PoPageModule,
  PoFieldModule,
  PoNotificationModule,
  PoDividerModule,
  PoButtonModule,
} from '@po-ui/ng-components';
import { RegistrarRouting } from './registrar.routing';
import { DadosService } from '../dados/dados.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RegistrarRouting,
    PoPageModule,
    ReactiveFormsModule,
    PoFieldModule,
    PoNotificationModule,
    PoDividerModule,
    PoButtonModule,
  ],
  declarations: [RegistrarComponent],
  providers: [RegistrarService, DadosService],
})
export class RegistrarModule {}
