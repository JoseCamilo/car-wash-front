import { Component, OnInit } from '@angular/core';
import { DadosService } from './dados.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { PoNotificationService } from '@po-ui/ng-components';

@Component({
  selector: 'app-dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.scss'],
})
export class DadosComponent implements OnInit {
  public formDados: FormGroup = new FormGroup({
    nome: new FormControl(''),
    endereco: new FormControl(''),
    numero: new FormControl(''),
    complemento: new FormControl(''),
    telefone: new FormControl(''),
  });

  isHideLoading = false;
  loadingConfirmar = false;
  user = { email: '', papel: '' };

  constructor(
    private service: DadosService,
    private router: Router,
    private poNotification: PoNotificationService
  ) {}

  ngOnInit(): void {
    this.service
      .getDadosUser()
      .then((user: any) => {
        this.user.email = user[0]?.email;
        this.user.papel = user[1]?.papel;
        if (user[1]) {
          this.formDados.patchValue(user[1]);
        }
        this.isHideLoading = true;
      })
      .catch((erro) => {
        console.error(erro);
        this.isHideLoading = true;
        this.poNotification.warning('Sessão expirada!');
        this.router.navigateByUrl('login');
      });
  }

  saveDados(): void {
    this.loadingConfirmar = true;
    this.service
      .salvaDados(
        this.user.email,
        this.formDados.value.nome,
        this.formDados.value.endereco,
        this.formDados.value.numero,
        this.formDados.value.complemento,
        this.formDados.value.telefone,
        this.user.papel
      )
      .then(() => {
        this.poNotification.success('Dados salvos!');
        this.loadingConfirmar = false;
        this.router.navigateByUrl('schedule');
      })
      .catch((erro) => {
        console.error(erro);
        this.poNotification.error('Erro ao tentar salvar os dados!');
        this.loadingConfirmar = false;
      });
  }
}
