import * as firebase from 'firebase';

export class AgendarService {
  salvaAgenda(email, agenda): Promise<any> {
    const userRef = btoa(email);
    return firebase.database().ref(`agenda/${userRef}`).push(agenda);
  }

  getHorasByDataCalendario(data): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(`calendario/${data}`)
        .once('value')
        .then((snapshot: any) => {
          const horas: Array<any> = [];

          snapshot.forEach((childSnapshot: any) => {
            const hora = childSnapshot.val();
            hora.key = childSnapshot.key;

            horas.push(hora);
          });

          resolve(horas);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  salvaHoraInCalendario(agenda): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getHorasByDataCalendario(agenda.data).then((horas: any) => {
        let hora;
        horas.forEach((element) => {
          if (element.hora === agenda.hora) {
            hora = element;
          }
        });

        if (hora) {
          firebase
            .database()
            .ref(`calendario/${agenda.data}/${hora.key}`)
            .set({ hora: agenda.hora, qtd: hora.qtd + 1 })
            .then(() => resolve())
            .catch(() => reject());
        } else {
          firebase
            .database()
            .ref(`calendario/${agenda.data}`)
            .push({ hora: agenda.hora, qtd: 1 })
            .then(() => resolve())
            .catch(() => reject());
        }
      });
    });
  }

  getAgenda(emailb64, id): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(`agenda/${emailb64}/${id}`)
        .once('value')
        .then((snapshot: any) => {
          const agenda = snapshot.val();
          agenda.key = snapshot.key;

          resolve(agenda);
        })
        .catch((erro) => {
          console.log(erro);
          reject(erro);
        });
    });
  }

  updateAgenda(email, agenda): Promise<any> {
    const userRef = btoa(email);
    const keyRef = agenda.key;
    return firebase.database().ref(`agenda/${userRef}/${keyRef}`).set(agenda);
  }
}
