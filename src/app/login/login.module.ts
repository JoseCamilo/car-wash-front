import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginRouting } from './login.routing';
import { LoginService } from './login.service';
import { PoPageLoginModule } from '@po-ui/ng-templates';
import { BannerComponent } from './banner/banner.component';
import { ServicosService } from '../servicos/servicos.service';
import { PoListViewModule } from '@po-ui/ng-components';
import { LojaDadosService } from '../loja-dados/loja-dados.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoginRouting,
    PoPageLoginModule,
    PoListViewModule,
  ],
  declarations: [LoginComponent, BannerComponent],
  providers: [LoginService, ServicosService, LojaDadosService],
})
export class LoginModule {}
