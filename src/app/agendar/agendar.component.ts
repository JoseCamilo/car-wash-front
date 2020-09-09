import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PoSelectOption, PoNotificationService } from '@po-ui/ng-components';
import { AgendarService } from './agendar.service';
import { Router } from '@angular/router';
import { ServicosService } from '../servicos/servicos.service';
import { DadosService } from '../dados/dados.service';
import { ExpedienteService } from '../expediente/expediente.service';

@Component({
  selector: 'app-agendar',
  templateUrl: './agendar.component.html',
  styleUrls: ['./agendar.component.scss'],
})
export class AgendarComponent implements OnInit {
  public formAgendar: FormGroup = new FormGroup({
    carro: new FormControl('', [Validators.required]),
    hora: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required]),
    tipoVeiculo: new FormControl('', [Validators.required]),
  });

  public minDate = new Date();
  public dateCalendar = this.minDate;

  public myHoraOptions: PoSelectOption[] = [];
  public myTipoServicoOptions: PoSelectOption[] = [];
  public myTipoVeiculoOptions: PoSelectOption[] = [];

  user = { email: '', papel: '', dados: null };
  loadingServicos = true;
  loadingHora = true;
  tipoServicos = [];
  tipoVeiculos = [];
  msgObrigatorio = '';
  descricaoServico = '';
  precoServico = 0;
  placeHora = '';

  constructor(
    private service: AgendarService,
    private servicosService: ServicosService,
    private dadosService: DadosService,
    private expedienteService: ExpedienteService,
    private poNotification: PoNotificationService,
    private router: Router
  ) {}

  get horaOptions(): Array<PoSelectOption> {
    return this.myHoraOptions;
  }

  get tipoServicoOptions(): Array<PoSelectOption> {
    return this.myTipoServicoOptions;
  }

  get tipoVeiculoOptions(): Array<PoSelectOption> {
    return this.myTipoVeiculoOptions;
  }

  ngOnInit(): void {
    this.dadosService
      .getDadosUser()
      .then((user: any) => {
        this.user.email = user[0].email;
        this.user.dados = user[1];
      })
      .catch((erro) => {
        console.error(erro);
        this.poNotification.warning('Sessão expirada!');
        this.router.navigateByUrl('login');
      });

    this.servicosService
      .getServicos()
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
    const agenda = {
      status: 'pendente',
      data: this.dateCalendar,
      carro: this.formAgendar.value.carro,
      hora: this.formAgendar.value.hora,
      tipo: this.getDescTipo(this.formAgendar.value.tipo),
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
        this.router.navigateByUrl('home');
      })
      .catch((erro) => {
        console.error(erro);
        this.poNotification.error(
          'Desculpa, tivemos um problema no agendamento!'
        );
      });
  }

  changeCalendar(event): void {
    this.reloadHoraOptions(event);
  }
  reloadHoraOptions(event: string /*2020-08-31*/): void {
    event = event + '';
    this.loadingHora = true;
    this.formAgendar.patchValue({ hora: '' });
    let resultOption: Array<PoSelectOption> = [];

    // Busca hoarario no cadastro de expediente
    this.expedienteService
      .getExpediente()
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

  getDescTipo(tipo): string {
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
    this.msgObrigatorio = this.service.getMessageObrigatorio(
      this.tipoServicos[pos],
      this.user.dados
    );
    this.setTipoVeiculoOptions(this.tipoServicos[pos]);
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

  meusDados(): void {
    this.router.navigateByUrl('data');
  }
}
