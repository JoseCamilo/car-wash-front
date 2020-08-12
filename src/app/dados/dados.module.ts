import { NgModule } from '@angular/core';
import { DadosComponent } from './dados.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DadosRouting } from './dados.routing';
import { PoPageModule } from '@po-ui/ng-components';
import { PoButtonModule } from '@po-ui/ng-components';
import { PoFieldModule } from '@po-ui/ng-components';
import { PoNotificationModule } from '@po-ui/ng-components';
import { DadosService } from './dados.service';
import { PoLoadingModule } from '@po-ui/ng-components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DadosRouting,
    PoPageModule,
    PoButtonModule,
    ReactiveFormsModule,
    PoFieldModule,
    PoNotificationModule,
    PoLoadingModule,
  ],
  declarations: [DadosComponent],
  providers: [DadosService],
})
export class DadosModule {}
