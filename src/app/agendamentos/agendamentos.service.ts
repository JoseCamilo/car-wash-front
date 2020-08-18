import * as firebase from 'firebase';

export class AgendamentosService {
  public getAgendas(): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(`agenda`)
        .once('value')
        .then((snapshot: any) => {
          const agendas: Array<any> = [];

          snapshot.forEach((childSnapshot: any) => {
            const refKey = childSnapshot.key;

            firebase
              .database()
              .ref(`agenda/${refKey}`)
              .once('value')
              .then((snapAgendas: any) => {
                snapAgendas.forEach((snapAg: any) => {
                  const agenda = snapAg.val();
                  agenda.key = snapAg.key;
                  agenda.email = atob(refKey);
                  agenda.nome = agenda.cliente?.nome;
                  agendas.push(agenda);
                  agendas.sort((a, b) =>
                    a.data > b.data
                      ? -1
                      : a.data === b.data
                      ? a.hora > b.hora
                        ? -1
                        : 1
                      : 1
                  );
                });
              });
          });
          resolve(agendas);
        })
        .catch((erro) => {
          console.log(erro);
          reject(erro);
        });
    });
  }

  public updateStatusAgenda(agenda, status): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const userRef = btoa(user.email);
          agenda.status = status;
          firebase
            .database()
            .ref(`agenda/${userRef}/${agenda.key}`)
            .set(agenda)
            .then(() => resolve())
            .catch(() => reject());
        }
      });
    });
  }
}
