import { Component, OnInit } from '@angular/core';
import { PoListViewLiterals } from '@po-ui/ng-components';
import { ServicosService } from '../../servicos/servicos.service';
import { listEnterSmoothAnimation } from '../../shared/animations';
import { LojaDadosService } from 'src/app/loja-dados/loja-dados.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  animations: [listEnterSmoothAnimation],
})
export class BannerComponent implements OnInit {
  private myServicos: Array<any> = [];
  public loja: any = null;

  customLiteralsServicos: PoListViewLiterals = {
    noData: 'Lista de serviços vazia',
  };

  isHideLoading = false;

  constructor(
    private servicosService: ServicosService,
    private lojaDadosService: LojaDadosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.servicosService.getServicosAnonymous().then((res) => {
      this.lojaDadosService
        .getLojaDados()
        .then((dados) => {
          this.loja = dados;
          this.myServicos = res;
          this.isHideLoading = true;
        })
        .catch((erro) => {
          this.myServicos = res;
          this.isHideLoading = true;
        });
    });
  }

  get servicos(): Array<any> {
    return this.myServicos;
  }

  onAgendarAnonimo(): void {
    this.router.navigateByUrl('agendar-anonimo');
  }
}
