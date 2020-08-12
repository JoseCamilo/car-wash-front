import * as firebase from 'firebase';

export class HomeService {
  public getAgendas(): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        const userRef = btoa(user.email);
        firebase
          .database()
          .ref(`agenda/${userRef}`)
          .orderByKey()
          .once('value')
          .then((snapshot: any) => {
            const agendas: Array<any> = [];

            snapshot.forEach((childSnapshot: any) => {
              const agenda = childSnapshot.val();
              agendas.push(agenda);
            });
            resolve(agendas);
          })
          .catch((erro) => {
            console.log(erro);
            reject(erro);
          });
      });
    });
  }

  public cancelAgenda(agenda): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        const userRef = btoa(user.email);
        agenda.status = 'cancelado';
        firebase
          .database()
          .ref(`agenda/${userRef}/${agenda.key}`)
          .set(agenda)
          .then(() => resolve())
          .catch(() => reject());
      });
    });
  }
}
