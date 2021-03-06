import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CadastroService } from '../../shared/cadastro.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

//import { Usuario } from '../../Usuario/usuario.model';
import { UsuarioService } from '../../Usuario/usuario.service';

@Component({
  selector: 'app-formulario-cadastro',
  templateUrl: './formulario-cadastro.component.html',
  styleUrls: ['./formulario-cadastro.component.css'],
})
export class FormularioCadastroComponent implements OnInit {
  constructor(
    public service: CadastroService,
    public dialogRef: MatDialogRef<FormularioCadastroComponent>,
    public usuarioService: UsuarioService,
    private _snackBar: MatSnackBar
  ) {}

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  //@Output() usuarioAdicionado = new EventEmitter<Usuario>();
  ngOnInit(): void {}

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

  onAdicionarUsuario(form: NgForm) {
    this.usuarioService.adicionarUsuario(
      form.value.nome,
      form.value.senha,
      form.value.email
    );
    console.log(form.value);
    /*const usuario: Usuario = {
    nome: form.value.nome,
    senha: form.value.senha,
    email: form.value.email,
    };
    this.usuarioAdicionado.emit(usuario);
    */

    //Teste de push
    form.resetForm();
    this.onClose();

    this._snackBar.open('Usuário cadastrado', '', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
