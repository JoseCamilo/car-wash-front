import * as firebase from 'firebase';

export class DadosService {
  public salvaDados(
    user,
    endereco = '',
    numero = '',
    complemento = '',
    telefone = ''
  ): Promise<any> {
    const refUser = btoa(user.email);
    const data = {
      endereco,
      numero,
      complemento,
      telefone,
    };

    return firebase.database().ref(`usuarios/${refUser}`).set(data);
  }

  getDadosUser(user): Promise<any> {
    const refUser = btoa(user?.email);
    return firebase.database().ref(`usuarios/${refUser}`).once('value');
  }
}
