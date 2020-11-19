import { Usuario } from './usuario.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UsuarioService {

  constructor(private httpClient: HttpClient) {}

  private usuarios: Usuario[] = [];

  getUsuarios(): void {
    this.httpClient
      .get<{ usuarios: Usuario[] }>('http://localhost:3000/api/usuarios')
      .subscribe((dados) => {
        this.usuarios = dados.usuarios;
      });
  }

  adicionarUsuario(nome: string, senha: string, email: string) {
    const usuario: Usuario = {
      nome: nome,
      senha: senha,
      email: email,
    };
    this.httpClient
      .post('http://localhost:3000/api/usuarios', usuario)
      .subscribe((dados) => {
        console.log(dados);
        this.usuarios.push(usuario);
      });
  }

  logar(email: string, senha: string){
    console.log("usuario service lgoar");
    const usuario: Usuario = {
      nome: "a",
      senha: senha,
      email: email,
    };
    console.log(usuario.email);
    console.log(usuario.nome);
    console.log(usuario.senha);

    //this.httpClient
    //.post('http://localhost:3000/logar', usuario);

    console.log(JSON.stringify(usuario));
    console.log("------------");
    //this.httpClient.post<Usuario>('http://localhost:3000/logar', JSON.stringify(usuario));

    this.httpClient.post(`http://localhost:3000/logar`, usuario)
    .subscribe(
      resultado => {
        console.log(resultado)
      },
      erro => {
        if(erro.status == 400) {
          console.log(erro);
        }
      }
    );

    
    
  };
}
