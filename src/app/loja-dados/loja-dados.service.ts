import * as firebase from 'firebase';

export class LojaDadosService {
  public salvaLojaDados(data): Promise<any> {
    return firebase.database().ref(`admin/dadosloja`).set(data);
  }

  getLojaDados(): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(`admin/dadosloja`)
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
}
