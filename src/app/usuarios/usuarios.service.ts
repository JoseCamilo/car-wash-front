import * as firebase from 'firebase';

export class UsuariosService {
  public getUsuarios(): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(`usuarios`)
        .orderByKey()
        .once('value')
        .then((snapshot: any) => {
          const usuarios: Array<any> = [];

          snapshot.forEach((childSnapshot: any) => {
            const usuario = childSnapshot.val();
            usuario.key = childSnapshot.key;
            usuario.email = atob(childSnapshot.key);

            usuarios.push(usuario);
          });
          resolve(usuarios);
        })
        .catch((erro) => {
          console.log(erro);
          reject(erro);
        });
    });
  }

  public getUsuario(id): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(`usuarios/${id}`)
        .orderByKey()
        .once('value')
        .then((snapshot: any) => {
          const usuario = snapshot.val();
          usuario.key = snapshot.key;
          resolve(usuario);
        })
        .catch((erro) => {
          console.log(erro);
          reject(erro);
        });
    });
  }

  public deleteUsuario(usuario): Promise<any> {
    return firebase.database().ref(`usuarios/${usuario.key}`).remove();
  }

  public saveUsuario(usuario): Promise<any> {
    if (usuario.key) {
      return firebase.database().ref(`usuarios/${usuario.key}`).update(usuario);
    } else {
      return firebase.database().ref(`usuarios`).push(usuario);
    }
  }
}
