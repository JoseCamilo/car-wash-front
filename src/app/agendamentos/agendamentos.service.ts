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
      const userRef = btoa(agenda.email);
      agenda.status = status;
      delete agenda.nome;
      delete agenda.$showDetail;
      firebase
        .database()
        .ref(`agenda/${userRef}/${agenda.key}`)
        .set(agenda)
        .then(() => resolve())
        .catch(() => reject());
    });
  }

  public getDateHoje(): string {
    const date = new Date();
    const mes = ('00' + (date.getMonth() + 1)).slice(-2);
    const dia = ('00' + date.getDate()).slice(-2);
    return `${date.getFullYear()}-${mes}-${dia}`;
  }

  public getDateSemana(): string {
    const date = new Date();
    const time = date.getTime();
    const day = date.getDay();
    const newTime = time + (7 - day) * 86400000;
    const newDate = new Date(newTime);

    const mes = ('00' + (newDate.getMonth() + 1)).slice(-2);
    const dia = ('00' + newDate.getDate()).slice(-2);
    return `${newDate.getFullYear()}-${mes}-${dia}`;
  }
}
