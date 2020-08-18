import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegistrarService } from './registrar.service';
import { PoNotificationService } from '@po-ui/ng-components';
import { Router } from '@angular/router';
import { DadosService } from '../dados/dados.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'],
})
export class RegistrarComponent implements OnInit {
  public loadingConfirmar = false;
  public formRegistrar: FormGroup = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirm: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    private service: RegistrarService,
    private serviceDados: DadosService,
    private poNotification: PoNotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  saveRegistrar(): void {
    this.loadingConfirmar = true;

    this.service
      .createUser(
        this.formRegistrar.value.login,
        this.formRegistrar.value.password
      )
      .then((resp) => {
        this.loadingConfirmar = false;
        this.poNotification.success('Usuário criado!');
        this.router.navigateByUrl('home');
        this.serviceDados.salvaDados(this.formRegistrar.value.login);
      })
      .catch((error) => {
        this.loadingConfirmar = false;
        console.error(error);

        if (error.code.includes('email-already-in-use')) {
          this.poNotification.error(
            'Este email de usuário já existe! Tente recuperar a senha pela tela de Login!'
          );
        } else {
          this.poNotification.error(error.message);
        }
      });
  }

  navLogin(): void {
    this.router.navigateByUrl('login');
  }
}
