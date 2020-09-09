import { Component, OnInit } from '@angular/core';
import { PoNavbarItem, PoNavbarIconAction } from '@po-ui/ng-components';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { DadosService } from '../dados/dados.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public items: Array<PoNavbarItem> = [
    { label: 'Agenda', link: '/home' },
    { label: 'Meus dados', link: '/data' },
  ];

  readonly menuAdmin = [
    { label: 'Agendamentos', link: '/schedules' },
    { label: 'Serviços', link: '/services' },
    { label: 'Expediente', link: '/expedient' },
    { label: 'Usuários', link: '/users' },
    { label: 'Dados da Loja', link: '/store-data' },
  ];
  readonly menuSair = [{ label: 'Sair', action: this.onSair.bind(this) }];

  readonly iconActions: Array<PoNavbarIconAction> = [
    {
      icon: 'po-icon-social-instagram',
      link: 'https://www.instagram.com/jfcamilo3/',
      label: 'Instagram',
    },
    {
      icon: 'po-icon-social-twitter',
      link: 'https://twitter.com/@josefrcamilo',
      label: 'Twitter',
    },
  ];

  constructor(private router: Router, private dadosService: DadosService) {}

  ngOnInit(): void {
    this.dadosService.getDadosUser().then((user: any) => {
      if (user[1]?.papel === 'admin') {
        this.items = [...this.items, ...this.menuAdmin, ...this.menuSair];
      } else {
        this.items = [...this.items, ...this.menuSair];
      }
    });
  }

  onSair(): void {
    firebase.auth().signOut();
    this.router.navigateByUrl('login');
  }
}
