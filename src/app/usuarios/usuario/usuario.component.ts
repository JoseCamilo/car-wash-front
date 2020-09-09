import { Component, OnInit } from '@angular/core';
import { PoNotificationService, PoSelectOption } from '@po-ui/ng-components';
import { UsuariosService } from '../usuarios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from '../usuario.interface';

@Component({
  selector: 'app-usuario',
  templateUrl: './Usuario.component.html',
  styleUrls: ['./Usuario.component.scss'],
})
export class UsuarioComponent implements OnInit {
  isHideLoading = false;
  loadingConfirmar = false;
  usuario = {} as Usuario;

  papelOptions: PoSelectOption[] = [
    { value: 'cliente', label: 'Cliente' },
    { value: 'admin', label: 'Administrador' },
  ];

  formUsuario: FormGroup = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    endereco: new FormControl(''),
    numero: new FormControl(''),
    complemento: new FormControl(''),
    telefone: new FormControl(''),
    papel: new FormControl(''),
    login: new FormControl('', [Validators.required]),
  });

  constructor(
    private service: UsuariosService,
    private router: Router,
    private poNotification: PoNotificationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.params.id) {
      this.onLoadUsuario(decodeURIComponent(this.route.snapshot.params.id));
    } else {
      this.isHideLoading = true;
    }
  }

  onLoadUsuario(id): void {
    this.service
      .getUsuario(id)
      .then((res) => {
        this.usuario = res;

        this.formUsuario.get('nome').setValue(this.usuario.nome);
        this.formUsuario.get('endereco').setValue(this.usuario.endereco);
        this.formUsuario.get('numero').setValue(this.usuario.numero);
        this.formUsuario.get('complemento').setValue(this.usuario.complemento);
        this.formUsuario.get('telefone').setValue(this.usuario.telefone);
        this.formUsuario.get('papel').setValue(this.usuario.papel);
        this.formUsuario.get('login').setValue(atob(this.usuario.key));

        this.isHideLoading = true;
      })
      .catch((error) => {
        this.isHideLoading = true;
        this.poNotification.error(
          'Desculpa, tivemos um erro ao buscar o Usuário!'
        );
      });
  }

  saveUsuario(): void {
    this.isHideLoading = false;

    this.usuario.nome = this.formUsuario.value.nome;
    this.usuario.endereco = this.formUsuario.value.endereco;
    this.usuario.numero = this.formUsuario.value.numero;
    this.usuario.complemento = this.formUsuario.value.complemento;
    this.usuario.telefone = this.formUsuario.value.telefone;
    this.usuario.papel = this.formUsuario.value.papel;
    this.usuario.key = this.usuario.key || btoa(this.formUsuario.value.login);

    this.service
      .saveUsuario(this.usuario)
      .then(() => {
        this.isHideLoading = true;
        this.poNotification.success('Usuário salvo!');
        this.router.navigateByUrl('users');
      })
      .catch(() => {
        this.isHideLoading = true;
        this.poNotification.error(
          'Desculpa, tivemos um erro ao salvar o usuário!'
        );
      });
  }
}
