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
import { UsuariosService } from './usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  myItems = [];
  myItemsFiltered = [];
  isHideLoading = false;
  labelFilter;
  itemDelete;

  public readonly actions: Array<PoPageAction> = [
    { label: 'Novo Usuário', action: this.createUsuario.bind(this) },
  ];

  readonly filterSettings: PoPageFilter = {
    action: this.processesFilter.bind(this),
    placeholder: 'Pesquisar',
  };

  private myListActions: Array<PoListViewAction> = [
    {
      label: 'Editar',
      action: this.updateUsuario.bind(this),
      icon: 'po-icon-edit',
    },
    {
      label: 'Excluir',
      action: this.deleteUsuario.bind(this),
      icon: 'po-icon-delete',
      type: 'danger',
    },
  ];

  customLiterals: PoListViewLiterals = {
    noData: 'Não tem nenhum usuário cadastrado',
  };

  close: PoModalAction = {
    action: () => {
      this.closeModal();
    },
    label: 'Não',
  };

  confirm: PoModalAction = {
    action: () => {
      this.processDeleteUsuario();
    },
    label: 'Sim',
    danger: true,
  };

  papelOptions: any[] = [
    { value: '', label: 'Cliente' },
    { value: 'admin', label: 'Administrador' },
  ];

  @ViewChild('excluirModal') excluirModal: PoModalComponent;

  constructor(
    private service: UsuariosService,
    private router: Router,
    private poNotification: PoNotificationService
  ) {}

  ngOnInit(): void {
    this.onRefreshUsuarios();
  }

  get items(): Array<any> {
    return this.myItemsFiltered;
  }

  get listActions(): Array<PoListViewAction> {
    return this.myListActions;
  }

  onRefreshUsuarios(): void {
    this.service
      .getUsuarios()
      .then((res) => {
        this.myItems = res;
        this.myItemsFiltered = this.myItems;
        this.isHideLoading = true;
      })
      .catch((error) => {
        this.isHideLoading = true;
        this.poNotification.error(
          'Desculpa, tivemos um erro ao buscar os Usuarios!'
        );
      });
  }

  createUsuario(): void {
    this.router.navigateByUrl(`/usuarios/item`);
  }
  updateUsuario(item): void {
    this.router.navigateByUrl(`/usuarios/item/${encodeURIComponent(item.key)}`);
  }

  deleteUsuario(item): void {
    this.itemDelete = item;
    this.excluirModal.open();
  }

  processDeleteUsuario(): void {
    this.closeModal();
    this.isHideLoading = false;
    this.service
      .deleteUsuario(this.itemDelete)
      .then(() => {
        this.onRefreshUsuarios();
        this.poNotification.success('Usuário excluído!');
      })
      .catch(() => {
        this.onRefreshUsuarios();
        this.poNotification.error(
          'Desculpa, tivemos um erro ao excluir o usuário!'
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

  getDescPapel(papel): string {
    let label = '';
    this.papelOptions.forEach((element) => {
      if (element.value === papel) {
        label = element.label;
      }
    });
    return label;
  }
}
