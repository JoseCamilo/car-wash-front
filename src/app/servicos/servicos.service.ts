import * as firebase from 'firebase';

export class ServicosService {
  public getServicos(): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(`admin/servicos`)
        .orderByKey()
        .once('value')
        .then((snapshot: any) => {
          const servicos: Array<any> = [];

          snapshot.forEach((childSnapshot: any) => {
            const servico = childSnapshot.val();
            servico.key = childSnapshot.key;

            servicos.push(servico);
          });
          resolve(servicos);
        })
        .catch((erro) => {
          console.log(erro);
          reject(erro);
        });
    });
  }

  public getServicosAnonymous(): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInAnonymously()
        .then((user: any) => {
          firebase
            .database()
            .ref(`admin/servicos`)
            .orderByKey()
            .once('value')
            .then((snapshot: any) => {
              const servicos: Array<any> = [];

              snapshot.forEach((childSnapshot: any) => {
                const servico = childSnapshot.val();
                servico.key = childSnapshot.key;

                servicos.push(servico);
              });
              resolve(servicos);
            })
            .catch((erro) => {
              console.log(erro);
              reject(erro);
            });
        });
    });
  }

  public getServico(id): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(`admin/servicos/${id}`)
        .orderByKey()
        .once('value')
        .then((snapshot: any) => {
          const servico = snapshot.val();
          servico.key = snapshot.key;
          resolve(servico);
        })
        .catch((erro) => {
          console.log(erro);
          reject(erro);
        });
    });
  }

  public deleteServico(servico): Promise<any> {
    return firebase.database().ref(`admin/servicos/${servico.key}`).remove();
  }

  public saveServico(service): Promise<any> {
    if (service.key) {
      return firebase
        .database()
        .ref(`admin/servicos/${service.key}`)
        .update(service);
    } else {
      return firebase.database().ref(`admin/servicos`).push(service);
    }
  }
}
