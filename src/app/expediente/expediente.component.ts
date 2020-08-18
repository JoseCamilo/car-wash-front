import { Component, OnInit } from '@angular/core';
import { ExpedienteService } from './expediente.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import {
  PoNotificationService,
  PoCheckboxGroupOption,
} from '@po-ui/ng-components';

@Component({
  selector: 'app-expediente',
  templateUrl: './expediente.component.html',
  styleUrls: ['./expediente.component.scss'],
})
export class ExpedienteComponent implements OnInit {
  public formExpediente: FormGroup = new FormGroup({
    segunda: new FormControl(''),
    terca: new FormControl(''),
    quarta: new FormControl(''),
    quinta: new FormControl(''),
    sexta: new FormControl(''),
    sabado: new FormControl(''),
    domingo: new FormControl(''),
    quantidade: new FormControl(''),
  });

  myHoraOptions: PoCheckboxGroupOption[] = [];

  isHideLoading = false;
  loadingConfirmar = false;

  constructor(
    private service: ExpedienteService,
    private router: Router,
    private poNotification: PoNotificationService
  ) {}

  ngOnInit(): void {
    this.service
      .getHorarios()
      .then((res: Array<any>) => {
        res.forEach((el) => {
          this.myHoraOptions = [
            ...this.myHoraOptions,
            { value: el, label: el },
          ];
        });

        this.service
          .getExpediente()
          .then((resp: any) => {
            this.formExpediente.patchValue(resp);
            this.isHideLoading = true;
          })
          .catch((erro) => {
            console.error(erro);
            this.isHideLoading = true;
            this.poNotification.warning('Falha ao buscar expedientes!');
          });
      })
      .catch((error) => {
        this.poNotification.warning('Falha ao buscar horarios!');
      });
  }

  get horaOptions(): any {
    return this.myHoraOptions;
  }

  saveExpediente(): void {
    this.loadingConfirmar = true;

    const data = {
      segunda: this.formExpediente.value.segunda,
      terca: this.formExpediente.value.terca,
      quarta: this.formExpediente.value.quarta,
      quinta: this.formExpediente.value.quinta,
      sexta: this.formExpediente.value.sexta,
      sabado: this.formExpediente.value.sabado,
      domingo: this.formExpediente.value.domingo,
      quantidade: this.formExpediente.value.quantidade || 1,
    };

    this.service
      .salvaExpediente(data)
      .then(() => {
        this.poNotification.success('Expediente salvos!');
        this.loadingConfirmar = false;
      })
      .catch((erro) => {
        console.error(erro);
        this.poNotification.error('Erro ao tentar salvar o Expediente!');
        this.loadingConfirmar = false;
      });
  }
}
