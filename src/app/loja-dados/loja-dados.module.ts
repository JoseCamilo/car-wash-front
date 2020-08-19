import { NgModule } from '@angular/core';
import { LojaDadosComponent } from './loja-dados.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LojaDadosRouting } from './loja-dados.routing';
import { PoPageModule } from '@po-ui/ng-components';
import { PoButtonModule } from '@po-ui/ng-components';
import { PoFieldModule } from '@po-ui/ng-components';
import { PoNotificationModule } from '@po-ui/ng-components';
import { LojaDadosService } from './loja-dados.service';
import { PoLoadingModule } from '@po-ui/ng-components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LojaDadosRouting,
    PoPageModule,
    PoButtonModule,
    ReactiveFormsModule,
    PoFieldModule,
    PoNotificationModule,
    PoLoadingModule,
  ],
  declarations: [LojaDadosComponent],
  providers: [LojaDadosService],
})
export class LojaDadosModule {}
