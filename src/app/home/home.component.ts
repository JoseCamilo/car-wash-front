import { Component, OnInit } from '@angular/core';
import {
  PoListViewAction,
  PoListViewLiterals,
  PoNotificationService,
} from '@po-ui/ng-components';
import { HomeService } from './home.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private myItems = [];
  isHideLoading = false;

  private myListActions: Array<PoListViewAction> = [
    {
      label: 'Cancelar',
      action: this.cancelar.bind(this),
      icon: 'po-icon-delete',
      type: 'danger',
    },
  ];

  private myServicos: Array<any> = [
    {
      titulo: 'Lavagem ecológica',
      descricao: 'Sem a utilização de água, nós limpamos o seu automóvel',
    },
    {
      titulo: 'Lavagem em casa',
      descricao:
        'Nós levamos os nossos produtos e realizamos o serviço na sua garagem',
    },
  ];

  private myServicosActions: Array<PoListViewAction> = [
    {
      label: 'Agendar',
      action: this.onAgendar.bind(this),
      icon: 'po-icon-calendar',
    },
  ];

  public myTipoServicoOptions = [];

  customLiterals: PoListViewLiterals = {
    noData: 'Você não tem nenhum agendamento',
  };

  constructor(
    private service: HomeService,
    private router: Router,
    private poNotification: PoNotificationService
  ) {}

  ngOnInit(): void {
    this.onRefreshAgendas();

    this.myTipoServicoOptions = [
      { value: 'lavagem-em-casa', label: 'Lavagem em casa' },
      { value: 'retirar-em-casa', label: 'Retirar em casa' },
      { value: 'deixarei-na-loja', label: 'Deixarei na Loja' },
    ];
  }

  get items(): Array<any> {
    return this.myItems;
  }

  get listActions(): Array<PoListViewAction> {
    return this.myListActions;
  }

  get servicos(): Array<any> {
    return this.myServicos;
  }

  get servicosActions(): Array<any> {
    return this.myServicosActions;
  }

  onRefreshAgendas(): void {
    this.service
      .getAgendas()
      .then((res) => {
        this.myItems = res;
        this.isHideLoading = true;
      })
      .catch((error) => {
        this.isHideLoading = true;
        this.poNotification.error(
          'Desculpa, tivemos um erro ao buscar seu agendamento!'
        );
      });
  }

  cancelar(item): void {
    this.isHideLoading = false;
    this.service
      .cancelAgenda(item)
      .then(() => {
        this.onRefreshAgendas();
        this.poNotification.success('Agenda cancelada!');
      })
      .catch(() => {
        this.onRefreshAgendas();
        this.poNotification.error(
          'Desculpa, tivemos um erro ao cancelar a agenda!'
        );
      });
  }

  onAgendar(): void {
    this.router.navigateByUrl('/agendar');
  }
}
