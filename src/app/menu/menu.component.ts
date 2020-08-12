import { Component, OnInit } from '@angular/core';
import { PoNavbarItem, PoNavbarIconAction } from '@po-ui/ng-components';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  readonly items: Array<PoNavbarItem> = [
    { label: 'Agenda', link: '/home' },
    { label: 'Meus dados', link: '/dados' },
    { label: 'Agendamentos', link: '/agendamentos' },
    { label: 'Ferramentas', link: '/tools' },
    { label: 'Sair', action: this.onSair.bind(this) },
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

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onSair(): void {
    firebase.auth().signOut();
    this.router.navigateByUrl('login');
  }
}
