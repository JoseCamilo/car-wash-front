import { NgModule } from '@angular/core';
import { AgendarComponent } from './agendar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AgendarRouting } from './agendar.routing';
import { PoPageModule } from '@po-ui/ng-components';
import { PoButtonModule } from '@po-ui/ng-components';
import { PoFieldModule } from '@po-ui/ng-components';
import { PoCalendarModule } from '@po-ui/ng-components';
import { PoNotificationModule } from '@po-ui/ng-components';
import { AgendarService } from './agendar.service';
import { PoBreadcrumbModule } from '@po-ui/ng-components';

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
  ],
  declarations: [AgendarComponent],
  providers: [AgendarService],
})
export class AgendarModule {}
