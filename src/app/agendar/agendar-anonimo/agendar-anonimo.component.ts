import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PoSelectOption, PoNotificationService } from '@po-ui/ng-components';
import { AgendarService } from '../agendar.service';
import { Router } from '@angular/router';
import { ServicosService } from '../../servicos/servicos.service';
import { DadosService } from '../../dados/dados.service';
import { ExpedienteService } from '../../expediente/expediente.service';

@Component({
  selector: 'app-agendar-anonimo',
  templateUrl: './agendar-anonimo.component.html',
  styleUrls: ['./agendar-anonimo.component.scss'],
})
export class AgendarAnonimoComponent implements OnInit {
  public formAgendar: FormGroup = new FormGroup({
    carro: new FormControl('', [Validators.required]),
    hora: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required]),
    tipoVeiculo: new FormControl('', [Validators.required]),
  });

  public formDados: FormGroup = new FormGroup({
    nome: new FormControl('', [Validators.minLength(5)]),
    endereco: new FormControl(''),
    numero: new FormControl(''),
    complemento: new FormControl(''),
    telefone: new FormControl(''),
  });

  public minDate = new Date();
  public dateCalendar = this.minDate;

  public myHoraOptions: PoSelectOption[] = [];
  public myTipoServicoOptions: PoSelectOption[] = [];
  public myTipoVeiculoOptions: PoSelectOption[] = [];

  user = { email: '', papel: '', dados: null };
  loadingServicos = true;
  loadingHora = true;
  enviado = false;
  tipoServicos = [];
  tipoVeiculos = [];
  msgObrigatorio = '';
  formDadosObrigatorio = '';
  descricaoServico = '';
  precoServico = 0;
  placeHora = '';

  constructor(
    private service: AgendarService,
    private servicosService: ServicosService,
    private expedienteService: ExpedienteService,
    private poNotification: PoNotificationService
  ) {}

  get horaOptions(): Array<PoSelectOption> {
    return this.myHoraOptions;
  }

  get tipoServicoOptions(): Array<PoSelectOption> {
    return this.myTipoServicoOptions;
  }

  get nome(): any {
    return this.formDados.get('nome');
  }

  get tipoVeiculoOptions(): Array<PoSelectOption> {
    return this.myTipoVeiculoOptions;
  }

  ngOnInit(): void {
    this.servicosService
      .getServicosAnonymous()
      .then((res: Array<any>) => {
        this.tipoServicos = [...res];
        res.forEach((el) => {
          this.myTipoServicoOptions.push({
            value: el.key,
            label: el.titulo,
          });
        });
        this.loadingServicos = false;
      })
      .catch((error) => {
        this.poNotification.error(
          'Desculpa, tivemos um erro ao buscar os Servicos!'
        );
      });
  }

  saveAgenda(): void {
    this.user.email = this.user.email || 'anonimo';
    this.user.dados = this.formDados.value;
    this.user.dados.nome = this.formDados.value.nome || 'Anônimo';

    const agenda = {
      status: 'pendente',
      data: this.dateCalendar,
      carro: this.formAgendar.value.carro,
      hora: this.formAgendar.value.hora,
      tipo: this.getDescricaoTipoServico(this.formAgendar.value.tipo),
      cliente: this.user.dados,
      preco: this.precoServico,
      email: this.user.email,
      tipoVeiculo: this.getLabelVeiculoByValue(
        this.formAgendar.value.tipoVeiculo
      ),
    };

    this.service
      .salvaAgenda(this.user.email, agenda)
      .then(() => {
        this.poNotification.success(
          'Sua solicitação de agendamento foi enviada!'
        );
        this.enviado = true;
      })
      .catch((erro) => {
        console.error(erro);
        this.poNotification.error(
          'Desculpa, tivemos um problema no agendamento!'
        );
      });
  }

  changeCalendar(event): void {
    this.enviado = false;
    this.reloadHoraOptions(event);
  }
  reloadHoraOptions(event: string /*2020-08-31*/): void {
    event = event + '';
    this.loadingHora = true;
    this.formAgendar.patchValue({ hora: '' });

    let resultOption: Array<PoSelectOption> = [];

    // Busca hoarario no cadastro de expediente
    this.expedienteService
      .getExpedienteAnonymous()
      .then((expediente: any) => {
        // Verifica se o horario esta disponivel conforme Calendário
        this.service
          .getHorasByDataCalendario(event)
          .then((hrsCalendario: any[]) => {
            resultOption = this.service.getHorasDisponiveis(
              expediente,
              hrsCalendario,
              event
            );

            if (resultOption?.length) {
              this.placeHora = '';
            } else {
              this.placeHora = 'Não existe horário disponível neste dia';
            }

            this.myHoraOptions = [...resultOption];
            this.loadingHora = false;
          })
          .catch((error) => {
            this.poNotification.error(
              'Desculpa, tivemos um problema para carregar os horários disponíveis!'
            );
          });
      })
      .catch((error) => {
        this.poNotification.error(
          'Desculpa, tivemos um problema para carregar os horários disponíveis!'
        );
      });
  }

  getDescricaoTipoServico(tipo): string {
    let label = '';
    this.myTipoServicoOptions.forEach((element) => {
      if (element.value === tipo) {
        label = element.label;
      }
    });
    return label;
  }
  getService4Desc(tipo): string {
    let label = '';
    this.myTipoServicoOptions.forEach((element) => {
      if (element.value === tipo) {
        label = element.label;
      }
    });
    return label;
  }

  changeServico(event): void {
    this.msgObrigatorio = '';

    const pos = this.tipoServicos
      .map((e) => {
        return e.key;
      })
      .indexOf(event);

    this.descricaoServico = this.tipoServicos[pos].descricao;
    this.formDadosObrigatorio = this.tipoServicos[pos].obrigatorio || [];
    this.msgObrigatorio = this.service.getMessageObrigatorio(
      this.tipoServicos[pos],
      this.user.dados
    );
    this.setTipoVeiculoOptions(this.tipoServicos[pos]);
  }
  changeMeusDados(): void {
    this.user.dados = this.formDados.value;
    const pos = this.tipoServicos
      .map((e) => {
        return e.key;
      })
      .indexOf(this.formAgendar.value.tipo);

    this.msgObrigatorio = this.service.getMessageObrigatorio(
      this.tipoServicos[pos],
      this.user.dados
    );
  }

  setTipoVeiculoOptions(servico): void {
    this.tipoVeiculos = [];
    this.formAgendar.patchValue({ tipoVeiculo: '' });
    this.myTipoVeiculoOptions = [];

    for (let i = 0; i < servico.precos?.length; i++) {
      const el = servico.precos[i];

      this.tipoVeiculos.push({
        value: i,
        label: el.tipo,
        preco: el.preco,
      });
      this.myTipoVeiculoOptions.push({
        value: i,
        label: el.tipo,
      });
    }
  }
  changeTipoVeiculo(event): void {
    this.precoServico = this.getPrecoTipoVeiculoByValue(event);
  }
  getPrecoTipoVeiculoByValue(value): number {
    const pos = this.tipoVeiculos
      .map((e) => {
        return e.value;
      })
      .indexOf(value);
    return this.tipoVeiculos[pos].preco;
  }
  getLabelVeiculoByValue(value): number {
    const pos = this.tipoVeiculos
      .map((e) => {
        return e.value;
      })
      .indexOf(value);
    return this.tipoVeiculos[pos].label;
  }
}
