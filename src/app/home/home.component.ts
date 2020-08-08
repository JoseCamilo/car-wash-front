import { Component, OnInit, ViewChild } from '@angular/core';
import {
  PoListViewAction,
  PoModalComponent,
  PoModalAction,
  PoSelectOption,
  PoNotificationService,
} from '@po-ui/ng-components';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private myItems: Array<any> = [
    {
      carro: 'Renegage preto',
      data: '2020-08-09',
      hora: '14:30',
      tipo: 'lavagem-em-casa',
      status: 'confirmado',
    },
    {
      carro: 'Fiesta vermelho',
      data: '2020-08-09',
      hora: '14:45',
      tipo: 'deixarei-na-loja',
      status: 'pendente',
    },
  ];

  private myListActions: Array<PoListViewAction> = [
    {
      label: 'Cancelar',
      action: this.cancelar.bind(this),
      icon: 'po-icon-delete',
    },
  ];

  public formAgendar: FormGroup = new FormGroup({
    carro: new FormControl(''),
    hora: new FormControl(''),
    tipo: new FormControl(''),
  });

  public confirm: PoModalAction = {
    action: () => {
      this.saveAgenda();
    },
    label: 'Confirmar',
  };

  public minDate = new Date();
  public dateCalendar = this.minDate;

  public myHoraOptions: PoSelectOption[] = [];
  public myTipoServicoOptions: PoSelectOption[] = [];

  @ViewChild('agendarModal', { static: false }) agendarModal: PoModalComponent;

  constructor(private poNotification: PoNotificationService) {}

  ngOnInit(): void {
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

  get items(): Array<any> {
    return this.myItems;
  }

  get listActions(): Array<PoListViewAction> {
    return this.myListActions;
  }

  get horaOptions(): Array<PoSelectOption> {
    return this.myHoraOptions;
  }

  get tipoServicoOptions(): Array<PoSelectOption> {
    return this.myTipoServicoOptions;
  }

  cancelar(item): void {
    console.log('cancelar', item);
  }

  onAgendar(): void {
    this.agendarModal.open();
  }

  saveAgenda(): void {
    console.log(this.dateCalendar);
    console.log(this.formAgendar);

    this.agendarModal.close();
    this.poNotification.success('Sua solicitação de agendamento foi enviada!');
  }

  changeCalendar(event): void {
    console.log(event);
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
