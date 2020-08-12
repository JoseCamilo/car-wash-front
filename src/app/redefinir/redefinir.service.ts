import * as firebase from 'firebase';

export class RedefinirService {
  public redefinirPass(login): Promise<any> {
    return firebase.auth().sendPasswordResetEmail(login);
  }
}
