import { Component, OnInit } from '@angular/core';
import {
  PoNotificationService,
  PoCheckboxGroupOption,
  PoTableLiterals,
  PoTableColumn,
} from '@po-ui/ng-components';
import { ServicosService } from '../servicos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-servico',
  templateUrl: './servico.component.html',
  styleUrls: ['./servico.component.scss'],
})
export class ServicoComponent implements OnInit {
  isHideLoading = false;
  loadingConfirmar = false;
  servico = { titulo: null, descricao: null, obrigatorio: null, precos: null };

  obrigatorioOptions: PoCheckboxGroupOption[] = [
    { value: 'nome', label: 'Nome' },
    { value: 'endereco', label: 'Endereço' },
    { value: 'telefone', label: 'Telefone' },
  ];

  formServico: FormGroup = new FormGroup({
    titulo: new FormControl('', [Validators.required]),
    descricao: new FormControl(''),
    obrigatorio: new FormControl(''),
  });

  formPreco: FormGroup = new FormGroup({
    tipo: new FormControl('', [Validators.required]),
    preco: new FormControl('', [Validators.required]),
  });

  tiposVeiculo: any[] = [];

  tableLiterals: PoTableLiterals = {
    noData: 'Nenhum preço cadastrado ainda',
  };

  tableColumn: PoTableColumn[] = [
    { property: 'tipo', label: 'Tipo de Veículo' },
    { property: 'preco', label: 'Preço R$' },
    {
      property: 'actions',
      label: 'Ações',
      type: 'icon',
      icons: [
        {
          action: this.editarTipoVeiculo.bind(this),
          color: 'color-03',
          icon: 'po-icon-edit',
          tooltip: 'Editar',
          value: 'edit',
        },
        {
          action: this.deletarTipoVeiculo.bind(this),
          color: 'color-07',
          icon: 'po-icon-delete',
          tooltip: 'Deletar',
          value: 'delete',
        },
      ],
    },
  ];

  constructor(
    private service: ServicosService,
    private router: Router,
    private poNotification: PoNotificationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.params.id) {
      this.onLoadServico(this.route.snapshot.params.id);
    } else {
      this.isHideLoading = true;
    }
  }

  onLoadServico(id): void {
    this.service
      .getServico(id)
      .then((res) => {
        this.servico = res;

        this.formServico.get('titulo').setValue(this.servico.titulo || '');
        this.formServico
          .get('descricao')
          .setValue(this.servico.descricao || '');
        this.formServico
          .get('obrigatorio')
          .setValue(this.servico.obrigatorio || '');
        this.tiposVeiculo = [...(this.servico.precos || [])];

        this.isHideLoading = true;
      })
      .catch((error) => {
        this.isHideLoading = true;
        this.poNotification.error(
          'Desculpa, tivemos um erro ao buscar o Serviço!'
        );
      });
  }

  saveServico(): void {
    this.isHideLoading = false;

    this.servico.titulo = this.formServico.value.titulo;
    this.servico.descricao = this.formServico.value.descricao;
    this.servico.obrigatorio = this.formServico.value.obrigatorio;
    this.servico.precos = this.tiposVeiculo;

    this.service
      .saveServico(this.servico)
      .then(() => {
        this.isHideLoading = true;
        this.poNotification.success('Serviço salvo!');
        this.router.navigateByUrl('services');
      })
      .catch(() => {
        this.isHideLoading = true;
        this.poNotification.error(
          'Desculpa, tivemos um erro ao salvar o serviço!'
        );
      });
  }

  saveTipoVeiculo(): void {
    const item = {
      tipo: this.formPreco.value.tipo,
      preco: this.formPreco.value.preco,
      actions: ['edit', 'delete'],
    };
    const pos = this.posTipoVeiculo(item);

    if (pos > -1) {
      this.tiposVeiculo[pos] = item;
    } else {
      this.tiposVeiculo.push(item);
    }

    this.formPreco.reset();
  }
  editarTipoVeiculo(item): void {
    this.formPreco.get('tipo').setValue(item.tipo);
    this.formPreco.get('preco').setValue(item.preco);
  }
  deletarTipoVeiculo(item): void {
    const pos = this.posTipoVeiculo(item);

    if (pos > -1) {
      this.tiposVeiculo.splice(pos, 1);
    }
  }
  posTipoVeiculo(item): number {
    const pos = this.tiposVeiculo
      .map((e) => {
        return e.tipo;
      })
      .indexOf(item.tipo);
    return pos;
  }
}
