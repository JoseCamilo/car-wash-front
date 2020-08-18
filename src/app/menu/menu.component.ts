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
    { label: 'Meus dados', link: '/dados' },
  ];

  readonly iconActions: Array<PoNavbarIconAction> = [
    {
      icon: 'po-icon-social-github',
      link: 'https://github.com/po-ui',
      label: 'Github',
    },
    {
      icon: 'po-icon-social-twitter',
      link: 'https://twitter.com/@pouidev',
      label: 'Twitter',
    },
    {
      icon: 'po-icon-social-instagram',
      link: 'https://www.instagram.com/pouidev/',
      label: 'Instagram',
    },
  ];

  constructor(private router: Router, private serviceDados: DadosService) {}

  ngOnInit(): void {
    const menuAdmin = [
      { label: 'Agendamentos', link: '/agendamentos' },
      { label: 'Serviços', link: '/servicos' },
      { label: 'Expediente', link: '/expediente' },
      { label: 'Sair', action: this.onSair.bind(this) },
    ];
    const menuUsr = [{ label: 'Sair', action: this.onSair.bind(this) }];

    this.serviceDados.getDadosUser().then((user: any) => {
      if (user[1]?.papel === 'admin') {
        this.items = [...this.items, ...menuAdmin];
      } else {
        this.items = [...this.items, ...menuUsr];
      }
    });
  }

  onSair(): void {
    firebase.auth().signOut();
    this.router.navigateByUrl('login');
  }
}
