import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginRouting } from './login.routing';
import { LoginService } from './login.service';
import { PoPageLoginModule } from '@po-ui/ng-templates';

@NgModule({
  imports: [CommonModule, FormsModule, LoginRouting, PoPageLoginModule],
  declarations: [LoginComponent],
  providers: [LoginService],
})
export class LoginModule {}
