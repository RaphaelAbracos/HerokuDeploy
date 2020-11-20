import { Usuario } from './usuario.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UsuarioService {

  constructor(private httpClient: HttpClient) {}

  private usuarios: Usuario[] = [];

  public usuario: Usuario;
  public token: string;

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
    console.log(usuario);
    this.httpClient
      .post('http://localhost:3000/api/usuarios', usuario)
      .subscribe((dados) => {
        console.log(dados);
        this.usuarios.push(usuario);
      });
  }

  logar(email: string, senha: string){
    const usuario: Usuario = {
      nome: "a",
      senha: senha,
      email: email,
    };
    return this.httpClient.post(`http://localhost:3000/logar`, usuario);  
  };

}
