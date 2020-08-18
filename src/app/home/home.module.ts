import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeRouting } from './home.routing';
import { PoPageModule } from '@po-ui/ng-components';
import { PoListViewModule } from '@po-ui/ng-components';
import { PoInfoModule } from '@po-ui/ng-components';
import { PoTagModule } from '@po-ui/ng-components';
import { PoButtonModule } from '@po-ui/ng-components';
import { PoFieldModule } from '@po-ui/ng-components';
import { PoCalendarModule } from '@po-ui/ng-components';
import { PoNotificationModule } from '@po-ui/ng-components';
import { PoTooltipModule } from '@po-ui/ng-components';
import { HomeService } from './home.service';
import { PoDividerModule } from '@po-ui/ng-components';
import { PoLoadingModule } from '@po-ui/ng-components';
import { ServicosService } from '../servicos/servicos.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomeRouting,
    PoPageModule,
    PoListViewModule,
    PoInfoModule,
    PoTagModule,
    PoButtonModule,
    ReactiveFormsModule,
    PoFieldModule,
    PoCalendarModule,
    PoNotificationModule,
    PoTooltipModule,
    PoDividerModule,
    PoLoadingModule,
  ],
  declarations: [HomeComponent],
  providers: [HomeService, ServicosService],
})
export class HomeModule {}
