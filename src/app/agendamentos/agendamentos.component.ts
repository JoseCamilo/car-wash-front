import { Component, OnInit } from '@angular/core';
import {
  PoListViewAction,
  PoListViewLiterals,
  PoNotificationService,
  PoPageFilter,
} from '@po-ui/ng-components';
import { AgendamentosService } from './agendamentos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.component.html',
  styleUrls: ['./agendamentos.component.scss'],
})
export class AgendamentosComponent implements OnInit {
  myItems = [];
  myItemsFiltered = [];
  isHideLoading = false;
  labelFilter;

  readonly filterSettings: PoPageFilter = {
    action: this.processesFilter.bind(this),
    ngModel: 'labelFilter',
    placeholder: 'Pesquisar',
  };

  private myListActions: Array<PoListViewAction> = [
    {
      label: 'Confirmar',
      action: this.updateStatusConfirmar.bind(this),
      icon: 'po-icon-clock',
    },
    {
      label: 'Cancelar',
      action: this.updateStatusCancelar.bind(this),
      icon: 'po-icon-delete',
      type: 'danger',
    },
    {
      label: 'Concluir',
      action: this.updateStatusConcluir.bind(this),
      icon: 'po-icon-ok',
      type: 'danger',
    },
    {
      label: 'Pendente',
      action: this.updateStatusPendente.bind(this),
      icon: 'po-icon-help',
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
    noData: 'Não tem nenhum agendamento',
  };

  constructor(
    private service: AgendamentosService,
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
    return this.myItemsFiltered;
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
        this.myItemsFiltered = this.myItems;
        this.isHideLoading = true;
      })
      .catch((error) => {
        this.isHideLoading = true;
        this.poNotification.error(
          'Desculpa, tivemos um erro ao buscar os agendamentos!'
        );
      });
  }

  onAgendar(): void {
    this.router.navigateByUrl('/agendar');
  }

  updateStatus(item, status): void {
    this.isHideLoading = false;
    this.service
      .updateStatusAgenda(item, status)
      .then(() => {
        this.onRefreshAgendas();
        this.poNotification.success('Agenda alterada!');
      })
      .catch(() => {
        this.onRefreshAgendas();
        this.poNotification.error(
          'Desculpa, tivemos um erro ao alterar a agenda!'
        );
      });
  }

  updateStatusConfirmar(item): void {
    this.updateStatus(item, 'confirmado');
  }
  updateStatusCancelar(item): void {
    this.updateStatus(item, 'cancelado');
  }
  updateStatusConcluir(item): void {
    this.updateStatus(item, 'concluido');
  }
  updateStatusPendente(item): void {
    this.updateStatus(item, 'pendente');
  }

  // Filtro
  processesFilter(labelFilter = this.labelFilter): any {
    const filters =
      typeof labelFilter === 'string' ? [labelFilter] : [...labelFilter];
    this.myItemsFiltered = this.myItems.filter((item) => {
      return Object.keys(item).some(
        (key) =>
          !(item[key] instanceof Object) &&
          this.includeFilter(item[key], filters)
      );
    });
  }
  includeFilter(item, filters): any {
    return filters.some((filter) =>
      String(item).toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );
  }
}
