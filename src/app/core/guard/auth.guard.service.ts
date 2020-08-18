import { Injectable } from '@angular/core';
import { CanActivateChild, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { DadosService } from 'src/app/dados/dados.service';

@Injectable()
export class AutenticacaoGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    return new Observable<boolean>((observer) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user && !user.isAnonymous) {
          observer.next(true);
          observer.complete();
        } else {
          this.router.navigateByUrl('login');
          observer.next(false);
          observer.complete();
        }
      });
    });
  }
}

@Injectable()
export class AdminAutenticacaoGuard implements CanActivate {
  constructor(private router: Router, private dadosService: DadosService) {}

  canActivate(): Observable<boolean> | boolean {
    return new Observable<boolean>((observer) => {
      this.dadosService
        .getDadosUser()
        .then((dados: any) => {
          if (dados[1]?.papel === 'admin') {
            observer.next(true);
            observer.complete();
          } else {
            this.router.navigateByUrl('login');
            observer.next(false);
            observer.complete();
          }
        })
        .catch((erro) => {
          this.router.navigateByUrl('login');
          observer.next(false);
          observer.complete();
        });
    });
  }
}
