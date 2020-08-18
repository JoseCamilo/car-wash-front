import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RedefinirService } from './redefinir.service';
import { PoNotificationService } from '@po-ui/ng-components';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redefinir',
  templateUrl: './redefinir.component.html',
  styleUrls: ['./redefinir.component.scss'],
})
export class RedefinirComponent implements OnInit {
  public loadingConfirmar = false;
  public formRedefinir: FormGroup = new FormGroup({
    login: new FormControl('', [Validators.required]),
  });

  constructor(
    private service: RedefinirService,
    private poNotification: PoNotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onRedefinir(): void {
    this.loadingConfirmar = true;

    this.service
      .redefinirPass(this.formRedefinir.value.login)
      .then(() => {
        this.loadingConfirmar = false;
        this.poNotification.success('Email enviado!');
        this.router.navigateByUrl('login');
      })
      .catch((error) => {
        this.loadingConfirmar = false;
        console.error(error);
        if (error.code.includes('user-not-found')) {
          this.poNotification.error(
            'Não encontramos um usuário com este endereço de email!'
          );
        } else {
          this.poNotification.error(error.message);
        }
      });
  }
}
