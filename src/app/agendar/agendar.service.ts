import * as firebase from 'firebase';

export class AgendarService {
  public salvaAgenda(user, agenda): Promise<any> {
    const userRef = btoa(user);
    return firebase.database().ref(`agenda/${userRef}`).push(agenda);
  }
}
