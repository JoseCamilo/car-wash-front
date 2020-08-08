import { Component } from '@angular/core';

import { PoNavbarItem, PoNavbarIconAction } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly items: Array<PoNavbarItem> = [
    { label: 'Agenda', link: '/' },
    { label: 'Componentes', link: '/documentation' },
    { label: 'Guias', link: '/guides' },
    { label: 'Ferramentas', link: '/tools' },
    { label: 'Como contribuir', link: 'https://github.com/po-ui/po-angular/blob/master/CONTRIBUTING.md' },
    { label: 'Licença', link: 'https://github.com/po-ui/po-angular/blob/master/LICENSE' },
    { label: 'Core Team', link: 'https://github.com/orgs/po-ui/people' }
  ];

 readonly iconActions: Array<PoNavbarIconAction> = [
    { icon: 'po-icon-social-github', link: 'https://github.com/po-ui', label: 'Github' },
    { icon: 'po-icon-social-twitter', link: 'https://twitter.com/@pouidev', label: 'Twitter' },
    { icon: 'po-icon-social-instagram', link: 'https://www.instagram.com/pouidev/', label: 'Instagram' }
  ];

  constructor() {}
}
