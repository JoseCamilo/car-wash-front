import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PoSelectOption, PoNotificationService } from '@po-ui/ng-components';
import { AgendarService } from '../agendar.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicosService } from '../../servicos/servicos.service';
import { DadosService } from '../../dados/dados.service';
import { ExpedienteService } from '../../expediente/expediente.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
})
export class AgendaComponent implements OnInit {
  public formAgendar: FormGroup = new FormGroup({
    carro: new FormControl(''),
    hora: new FormControl(''),
    tipo: new FormControl(''),
    preco: new FormControl(''),
    tipoVeiculo: new FormControl(''),
    observacao: new FormControl(''),
  });

  public dateCalendar = new Date();

  public myTipoServicoOptions: PoSelectOption[] = [];

  agenda = null;
  loading = true;

  constructor(
    private service: AgendarService,
    private poNotification: PoNotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  get tipoServicoOptions(): Array<PoSelectOption> {
    return this.myTipoServicoOptions;
  }

  ngOnInit(): void {
    if (this.route.snapshot.params?.email && this.route.snapshot.params?.id) {
      this.loading = true;
      this.service
        .getAgenda(
          decodeURIComponent(this.route.snapshot.params.email),
          decodeURIComponent(this.route.snapshot.params.id)
        )
        .then((agenda) => {
          this.agenda = agenda;
          this.dateCalendar = agenda.data;
          this.formAgendar.patchValue(agenda);
          this.loading = false;
        });
    }
  }

  saveAgenda(): void {
    this.agenda.carro = this.formAgendar.value.carro;
    this.agenda.hora = this.formAgendar.value.hora;
    this.agenda.tipo = this.formAgendar.value.tipo;
    this.agenda.tipoVeiculo = this.formAgendar.value.tipoVeiculo;
    this.agenda.preco = this.formAgendar.value.preco;
    this.agenda.data = this.dateCalendar;
    this.agenda.observacao = this.formAgendar.value.observacao;

    this.service
      .updateAgenda(this.agenda.email, this.agenda)
      .then(() => {
        this.router.navigateByUrl('schedules');
        this.poNotification.success(`Agenda alterada com sucesso!`);
      })
      .catch((erro) => {
        console.error(erro);
        this.poNotification.error(
          'Desculpa, tivemos um problema no agendamento!'
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
}
