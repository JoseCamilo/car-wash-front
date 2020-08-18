import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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
    carro: new FormControl(''),
    hora: new FormControl(''),
    tipo: new FormControl(''),
  });

  public minDate = new Date();
  public dateCalendar = this.minDate;

  public myHoraOptions: PoSelectOption[] = [];
  public myTipoServicoOptions: PoSelectOption[] = [];

  user = { email: '', papel: '', dados: null };
  loadingServicos = true;
  loadingHora = true;
  tipoServicos = [];
  msgObrigatorio = '';
  descricaoServico = '';
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
        this.tipoServicos = res;
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
    };

    this.service
      .salvaAgenda(this.user.email, agenda)
      .then(() => {
        this.service
          .salvaHoraInCalendario(agenda)
          .then(() => {
            this.poNotification.success(
              'Sua solicitação de agendamento foi enviada!'
            );
            this.router.navigateByUrl('home');
          })
          .catch(() => {
            this.poNotification.error(
              'Desculpa, tivemos um problema no agendamento!'
            );
          });
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
    const diaSemana = this.getDiaSemana(event);
    const resultOption: Array<PoSelectOption> = [];

    // Busca hoarario no cadastro de expediente
    this.expedienteService
      .getExpediente()
      .then((expediente: any) => {
        let horasExpediente: Array<any> = [];
        if (expediente[diaSemana].length) {
          horasExpediente = [...expediente[diaSemana]];
        } else {
          this.placeHora = 'Não existe horário disponível neste dia';
          return;
        }

        // Verifica se o horario esta disponivel conforme Calendário
        this.service
          .getHorasByDataCalendario(event)
          .then((hrsCalendario: any[]) => {
            horasExpediente.forEach((hrExpediente) => {
              let horaDisponivel = true;

              hrsCalendario.forEach((hrCalendario) => {
                if (horaDisponivel && hrCalendario.hora === hrExpediente) {
                  if (hrCalendario.qtd + 1 > expediente.quantidade) {
                    horaDisponivel = false;
                  }
                }
              });

              if (horaDisponivel) {
                resultOption.push({ value: hrExpediente, label: hrExpediente });
              }
            });

            if (resultOption.length) {
              this.placeHora = '';
            } else {
              this.placeHora = 'Não existe horário disponível neste dia';
            }

            this.myHoraOptions = [...resultOption];
            this.loadingHora = false;
          })
          .catch((error) => {
            this.loadingHora = false;
            this.poNotification.error(
              'Desculpa, tivemos um problema para carregar os horários disponíveis!'
            );
          });
      })
      .catch((error) => {
        this.loadingHora = false;
        this.poNotification.error(
          'Desculpa, tivemos um problema para carregar os horários disponíveis!'
        );
      });
  }
  getDiaSemana(data: string /*2020-08-31*/): string {
    const days = [
      'domingo',
      'segunda',
      'terca',
      'quarta',
      'quinta',
      'sexta',
      'sabado',
      'domingo',
    ];

    const ano = data.substr(0, 4);
    const mes = data.substr(5, 2);
    const dia = data.substr(8, 2);

    const day = new Date(+ano, +mes - 1, +dia).getDay();
    const semana = days[day];

    return semana;
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
    let invalid = false;
    let obrigatorios = '';
    this.msgObrigatorio = '';

    const pos = this.tipoServicos
      .map((e) => {
        return e.key;
      })
      .indexOf(event);

    this.descricaoServico = this.tipoServicos[pos].descricao;

    if (this.tipoServicos[pos].obrigatorio.length > 0) {
      this.tipoServicos[pos].obrigatorio.forEach((element) => {
        if (element === 'telefone' && !invalid) {
          invalid = this.user.dados.telefone ? false : true;
        } else if (element === 'endereco' && !invalid) {
          invalid =
            this.user.dados.endereco && this.user.dados.numero ? false : true;
        }
      });

      if (invalid) {
        this.tipoServicos[pos].obrigatorio.forEach((element) => {
          let label = '';
          label = element === 'telefone' ? 'Telefone' : label;
          label = element === 'endereco' ? 'Endereço' : label;
          obrigatorios += obrigatorios ? `/${label}` : label;
        });

        if (obrigatorios) {
          this.msgObrigatorio = `Para contratar este serviço, você precisa completar seu cadastro com a informação de ${obrigatorios}`;
        }
      }
    }
  }
  meusDados(): void {
    this.router.navigateByUrl('/dados');
  }
}
