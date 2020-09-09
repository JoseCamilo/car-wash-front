import { Component, OnInit } from '@angular/core';
import { PoPageLoginLiterals } from '@po-ui/ng-templates';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
import { enterSmoothTrigger } from '../shared/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [enterSmoothTrigger],
})
export class LoginComponent implements OnInit {
  customLiterals: PoPageLoginLiterals = {
    welcome: 'Bem-vindo ao Car Wash!',
    loginHint:
      'Caso tenha esquecido seu email, entre em contato com o suporte@carwash.com.br',
    registerUrl: 'Crie uma conta',
  };

  loadingConfirmar = false;
  errosPassword = [];

  constructor(
    private service: LoginService,
    private router: Router,
    private poNotification: PoNotificationService
  ) {}

  ngOnInit(): void {}

  onLogin(login): void {
    this.loadingConfirmar = true;
    this.service
      .signIn(login)
      .then(() => {
        this.loadingConfirmar = false;
        this.router.navigateByUrl('home');
      })
      .catch((error) => {
        this.loadingConfirmar = false;
        console.error(error);

        if (error.code.includes('wrong-password')) {
          this.errosPassword = ['Senha inválida!'];
          this.poNotification.error(this.errosPassword[0]);
        } else if (error.code.includes('user-not-found')) {
          this.errosPassword = ['Usuário não encontrado!'];
          this.poNotification.error(this.errosPassword[0]);
        } else {
          this.errosPassword = [error.message];
          this.poNotification.error(error.message);
        }
      });
  }

  cleanErro(): void {
    this.errosPassword = [];
  }
}
