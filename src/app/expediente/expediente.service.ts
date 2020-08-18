import * as firebase from 'firebase';

export class ExpedienteService {
  public salvaExpediente(data): Promise<any> {
    return firebase.database().ref(`admin/expediente/semana`).set(data);
  }

  getExpediente(): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(`admin/expediente/semana`)
        .once('value')
        .then((snapshot: any) => {
          const data = snapshot.val() || {};
          data.key = snapshot.key;
          resolve(data);
        })
        .catch((erro) => {
          console.log(erro);
          reject(erro);
        });
    });
  }

  getHorarios(): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(`admin/expediente/horarios`)
        .once('value')
        .then((snapshot: any) => {
          resolve(snapshot.val());
        })
        .catch((erro) => {
          console.error(erro);
          reject(erro);
        });
    });
  }
}
