import { Component, OnInit } from '@angular/core';
import { DadosService } from './dados.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { PoNotificationService } from '@po-ui/ng-components';
import * as firebase from 'firebase';

@Component({
  selector: 'app-dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.scss'],
})
export class DadosComponent implements OnInit {
  public formDados: FormGroup = new FormGroup({
    endereco: new FormControl(''),
    numero: new FormControl(''),
    complemento: new FormControl(''),
    telefone: new FormControl(''),
  });

  isHideLoading = false;
  loadingConfirmar = false;
  user;

  constructor(
    private service: DadosService,
    private router: Router,
    private poNotification: PoNotificationService
  ) {}

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user;

      if (this.user) {
        this.service
          .getDadosUser(this.user)
          .then((snapshot: any) => {
            const data = snapshot.val();

            this.formDados.patchValue(data);
            this.isHideLoading = true;
          })
          .catch((erro) => {
            console.error(erro);
            this.isHideLoading = true;
          });
      } else {
        this.poNotification.warning('Sessão expirada!');
        this.router.navigateByUrl('login');
      }
    });
  }

  saveDados(): void {
    this.service
      .salvaDados(
        this.user,
        this.formDados.value.endereco,
        this.formDados.value.numero,
        this.formDados.value.complemento,
        this.formDados.value.telefone
      )
      .then(() => {
        this.poNotification.success('Dados salvos!');
      })
      .catch((erro) => {
        console.error(erro);
        this.poNotification.error('Erro ao tentar salvar os dados!');
      });
  }
}
