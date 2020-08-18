import { Component, OnInit } from '@angular/core';
import {
  PoListViewAction,
  PoListViewLiterals,
  PoNotificationService,
  PoPageFilter,
  PoCheckboxGroupOption,
} from '@po-ui/ng-components';
import { ServicosService } from '../servicos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-servico',
  templateUrl: './servico.component.html',
  styleUrls: ['./servico.component.scss'],
})
export class ServicoComponent implements OnInit {
  isHideLoading = false;
  loadingConfirmar = false;
  servico = { titulo: null, descricao: null, obrigatorio: null, preco: null };

  obrigatorioOptions: PoCheckboxGroupOption[] = [
    { value: 'nome', label: 'Nome' },
    { value: 'endereco', label: 'Endereço' },
    { value: 'telefone', label: 'Telefone' },
  ];

  formServico: FormGroup = new FormGroup({
    titulo: new FormControl(''),
    descricao: new FormControl(''),
    obrigatorio: new FormControl(''),
    preco: new FormControl(''),
  });

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

        this.formServico.get('titulo').setValue(this.servico.titulo);
        this.formServico.get('descricao').setValue(this.servico.descricao);
        this.formServico.get('obrigatorio').setValue(this.servico.obrigatorio);
        this.formServico.get('preco').setValue(this.servico.preco);

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
    this.servico.preco = this.formServico.value.preco;

    this.service
      .saveServico(this.servico)
      .then(() => {
        this.isHideLoading = true;
        this.poNotification.success('Serviço salvo!');
        this.router.navigateByUrl('servicos');
      })
      .catch(() => {
        this.isHideLoading = true;
        this.poNotification.error(
          'Desculpa, tivemos um erro ao salvar o serviço!'
        );
      });
  }
}
