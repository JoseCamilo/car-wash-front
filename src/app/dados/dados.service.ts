import * as firebase from 'firebase';

export class DadosService {
  public salvaDados(
    email,
    endereco = '',
    numero = '',
    complemento = '',
    telefone = '',
    papel = ''
  ): Promise<any> {
    const refUser = btoa(email);
    const data = {
      endereco,
      numero,
      complemento,
      telefone,
      papel,
    };

    return firebase.database().ref(`usuarios/${refUser}`).set(data);
  }

  getDadosUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const userRef = btoa(user?.email);
          firebase
            .database()
            .ref(`usuarios/${userRef}`)
            .once('value')
            .then((snapshot: any) => {
              const data = snapshot.val();
              if (data) {
                data.key = snapshot.key;
              }
              resolve([user, data]);
            })
            .catch((erro) => {
              console.log(erro);
              reject(erro);
            });
        }
      });
    });
  }
}
