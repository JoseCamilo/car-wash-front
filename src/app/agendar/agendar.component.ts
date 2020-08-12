import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PoSelectOption, PoNotificationService } from '@po-ui/ng-components';
import { AgendarService } from './agendar.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

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

  user;

  constructor(
    private service: AgendarService,
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
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user.email;
    });

    this.myTipoServicoOptions = [
      { value: 'lavagem-em-casa', label: 'Lavagem em casa' },
      { value: 'retirar-em-casa', label: 'Retirar em casa' },
      { value: 'deixarei-na-loja', label: 'Deixarei na Loja' },
    ];

    this.myHoraOptions = [
      { value: '15:00', label: '15:00' },
      { value: '15:30', label: '15:30' },
      { value: '16:00', label: '16:00' },
      { value: '16:30', label: '16:30' },
    ];
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
      .salvaAgenda(this.user, agenda)
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
    this.reloadHoraOptions();
  }
  reloadHoraOptions(): void {
    this.formAgendar.patchValue({ hora: '' });
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
