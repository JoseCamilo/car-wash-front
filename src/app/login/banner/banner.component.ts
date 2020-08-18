import { Component, OnInit } from '@angular/core';
import { PoListViewLiterals } from '@po-ui/ng-components';
import { ServicosService } from '../../servicos/servicos.service';
import { listEnterSmoothAnimation } from '../../shared/animations';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  animations: [listEnterSmoothAnimation],
})
export class BannerComponent implements OnInit {
  private myServicos: Array<any> = [];

  customLiteralsServicos: PoListViewLiterals = {
    noData: 'Lista de serviços vazia',
  };

  isHideLoading = false;

  constructor(private servicosService: ServicosService) {}

  ngOnInit(): void {
    this.servicosService.getServicosAnonymous().then((res) => {
      this.myServicos = res;
      this.isHideLoading = true;
    });
  }

  get servicos(): Array<any> {
    return this.myServicos;
  }
}
