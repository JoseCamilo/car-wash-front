import { Component, OnInit, ViewChild } from '@angular/core';
import {
  PoListViewAction,
  PoListViewLiterals,
  PoNotificationService,
  PoPageFilter,
  PoPageAction,
  PoCheckboxGroupOption,
  PoModalAction,
  PoModalComponent,
} from '@po-ui/ng-components';
import { ServicosService } from './servicos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.component.html',
  styleUrls: ['./servicos.component.scss'],
})
export class ServicosComponent implements OnInit {
  myItems = [];
  myItemsFiltered = [];
  isHideLoading = false;
  labelFilter;
  itemDelete;

  public readonly actions: Array<PoPageAction> = [
    { label: 'Novo Serviço', action: this.createServico.bind(this) },
  ];

  readonly filterSettings: PoPageFilter = {
    action: this.processesFilter.bind(this),
    placeholder: 'Pesquisar',
  };

  private myListActions: Array<PoListViewAction> = [
    {
      label: 'Editar',
      action: this.updateServico.bind(this),
      icon: 'po-icon-edit',
    },
    {
      label: 'Excluir',
      action: this.deleteServico.bind(this),
      icon: 'po-icon-delete',
      type: 'danger',
    },
  ];

  customLiterals: PoListViewLiterals = {
    noData: 'Não tem nenhum serviço cadastrado',
  };

  obrigatorioOptions: PoCheckboxGroupOption[] = [
    { value: 'endereco', label: 'Endereço' },
    { value: 'telefone', label: 'Telefone' },
  ];

  close: PoModalAction = {
    action: () => {
      this.closeModal();
    },
    label: 'Não',
  };

  confirm: PoModalAction = {
    action: () => {
      this.processDeleteServico();
    },
    label: 'Sim',
    danger: true,
  };

  @ViewChild('excluirModal') excluirModal: PoModalComponent;

  constructor(
    private service: ServicosService,
    private router: Router,
    private poNotification: PoNotificationService
  ) {}

  ngOnInit(): void {
    this.onRefreshServicos();
  }

  get items(): Array<any> {
    return this.myItemsFiltered;
  }

  get listActions(): Array<PoListViewAction> {
    return this.myListActions;
  }

  onRefreshServicos(): void {
    this.service
      .getServicos()
      .then((res) => {
        this.myItems = res;
        this.myItemsFiltered = this.myItems;
        this.isHideLoading = true;
      })
      .catch((error) => {
        this.isHideLoading = true;
        this.poNotification.error(
          'Desculpa, tivemos um erro ao buscar os Servicos!'
        );
      });
  }

  createServico(): void {
    this.router.navigateByUrl(`/servicos/item`);
  }
  updateServico(item): void {
    this.router.navigateByUrl(`/servicos/item/${item.key}`);
  }

  deleteServico(item): void {
    this.itemDelete = item;
    this.excluirModal.open();
  }

  processDeleteServico(): void {
    this.closeModal();
    this.isHideLoading = false;
    this.service
      .deleteServico(this.itemDelete)
      .then(() => {
        this.onRefreshServicos();
        this.poNotification.success('Serviço excluído!');
      })
      .catch(() => {
        this.onRefreshServicos();
        this.poNotification.error(
          'Desculpa, tivemos um erro ao excluir o serviço!'
        );
      });
  }

  closeModal(): void {
    this.excluirModal.close();
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
