import { NgModule } from '@angular/core';
import { RedefinirComponent } from './redefinir.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RedefinirService } from './redefinir.service';
import {
  PoPageModule,
  PoFieldModule,
  PoNotificationModule,
  PoDividerModule,
  PoButtonModule,
} from '@po-ui/ng-components';
import { RedefinirRouting } from './redefinir.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RedefinirRouting,
    PoPageModule,
    ReactiveFormsModule,
    PoFieldModule,
    PoNotificationModule,
    PoDividerModule,
    PoButtonModule,
  ],
  declarations: [RedefinirComponent],
  providers: [RedefinirService],
})
export class RedefinirModule {}
