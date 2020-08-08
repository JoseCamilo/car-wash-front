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
import { PoModalModule } from '@po-ui/ng-components';
import { PoFieldModule } from '@po-ui/ng-components';
import { PoCalendarModule } from '@po-ui/ng-components';
import { PoNotificationModule } from '@po-ui/ng-components';
import { PoTooltipModule } from '@po-ui/ng-components';

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
    PoModalModule,
    ReactiveFormsModule,
    PoFieldModule,
    PoCalendarModule,
    PoNotificationModule,
    PoTooltipModule,
  ],
  declarations: [HomeComponent],
})
export class HomeModule {}
