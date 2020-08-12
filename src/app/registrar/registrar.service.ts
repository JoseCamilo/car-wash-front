import * as firebase from 'firebase';

export class RegistrarService {
  public createUser(login, senha): Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(login, senha);
  }
}
