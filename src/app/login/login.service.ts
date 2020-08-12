import * as firebase from 'firebase';
import { PoPageLogin } from '@po-ui/ng-templates';

export class LoginService {
  constructor() {}
  public signIn(conta: PoPageLogin): Promise<any> {
    return firebase
      .auth()
      .signInWithEmailAndPassword(conta.login, conta.password);
  }
}
