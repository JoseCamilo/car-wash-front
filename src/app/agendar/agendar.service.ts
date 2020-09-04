import * as firebase from 'firebase';

export class AgendarService {
  salvaAgenda(email, agenda): Promise<any> {
    const userRef = btoa(email);
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(`agenda/${userRef}`)
        .push(agenda)
        .then(() => {
          this.salvaHoraInCalendario(agenda)
            .then(() => {
              resolve();
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
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

  getMessageObrigatorio(service, dataUser): string {
    let message = '';
    let invalid = false;
    let obrigatorios = '';

    if (service?.obrigatorio?.length > 0) {
      service?.obrigatorio.forEach((element) => {
        if (element === 'telefone' && !invalid) {
          invalid = dataUser?.telefone ? false : true;
        } else if (element === 'endereco' && !invalid) {
          invalid = dataUser?.endereco && dataUser?.numero ? false : true;
        } else if (element === 'nome' && !invalid) {
          invalid = dataUser?.nome ? false : true;
        }
      });

      if (invalid) {
        service?.obrigatorio.forEach((element) => {
          let label = '';
          label = element === 'telefone' ? 'Telefone' : label;
          label = element === 'endereco' ? 'Endereço' : label;
          label = element === 'nome' ? 'Nome' : label;
          obrigatorios += obrigatorios ? `/${label}` : label;
        });

        if (obrigatorios) {
          message = `Para contratar este serviço, você precisa completar seus Dados com a informação de ${obrigatorios}`;
        }
      }
    }

    return message;
  }

  getDiaSemana(data: string /*2020-08-31*/): string {
    const days = [
      'domingo',
      'segunda',
      'terca',
      'quarta',
      'quinta',
      'sexta',
      'sabado',
      'domingo',
    ];

    const ano = data.substr(0, 4);
    const mes = data.substr(5, 2);
    const dia = data.substr(8, 2);

    const day = new Date(+ano, +mes - 1, +dia).getDay();
    const semana = days[day];

    return semana;
  }

  getHorasDisponiveis(expediente, hrsCalendario, data): Array<any> {
    const result = [];
    let horasExpediente = [];
    const diaSemana = this.getDiaSemana(data);

    if (expediente[diaSemana]?.length) {
      horasExpediente = [...expediente[diaSemana]];

      horasExpediente.forEach((hrExpediente) => {
        let horaDisponivel = true;

        hrsCalendario.forEach((hrCalendario) => {
          if (horaDisponivel && hrCalendario.hora === hrExpediente) {
            if (hrCalendario.qtd + 1 > expediente.quantidade) {
              horaDisponivel = false;
            }
          }
        });

        if (horaDisponivel) {
          result.push({ value: hrExpediente, label: hrExpediente });
        }
      });
    }
    return result;
  }
}
