import { Injectable } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable()
export class AutenticacaoGuard implements CanActivateChild {
  constructor(private router: Router) {}

  canActivateChild(): Observable<boolean> | boolean {
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
