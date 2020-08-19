import { Component, OnInit } from '@angular/core';
import { LojaDadosService } from './loja-dados.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { PoNotificationService } from '@po-ui/ng-components';

@Component({
  selector: 'app-loja-dados',
  templateUrl: './loja-dados.component.html',
  styleUrls: ['./loja-dados.component.scss'],
})
export class LojaDadosComponent implements OnInit {
  public formLojaDados: FormGroup = new FormGroup({
    msgBanner: new FormControl(''),
    promocoes: new FormControl(''),
    endereco: new FormControl(''),
    linkEndereco: new FormControl(''),
  });

  isHideLoading = false;
  loadingConfirmar = false;

  constructor(
    private service: LojaDadosService,
    private poNotification: PoNotificationService
  ) {}

  ngOnInit(): void {
    this.service
      .getLojaDados()
      .then((resp: any) => {
        this.formLojaDados.patchValue(resp);
        this.isHideLoading = true;
      })
      .catch((erro) => {
        console.error(erro);
        this.isHideLoading = true;
        this.poNotification.warning('Falha ao buscar dados da Loja!');
      });
  }

  saveLojaDados(): void {
    this.loadingConfirmar = true;

    const data = {
      msgBanner: this.formLojaDados.value.msgBanner,
      promocoes: this.formLojaDados.value.promocoes,
      endereco: this.formLojaDados.value.endereco,
      linkEndereco: this.formLojaDados.value.linkEndereco,
    };

    this.service
      .salvaLojaDados(data)
      .then(() => {
        this.poNotification.success('Dados da Loja salvos!');
        this.loadingConfirmar = false;
      })
      .catch((erro) => {
        console.error(erro);
        this.poNotification.error('Erro ao tentar salvar os dados da Loja!');
        this.loadingConfirmar = false;
      });
  }
}
