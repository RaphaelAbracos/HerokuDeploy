import { Usuario } from './usuario.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private usuarios: Usuario[] = [];

  constructor(private httpClient: HttpClient) {}

  getUsuario(): Usuario[] {
    return [...this.usuarios];
  }

  adicionarUsuario(nome: string, senha: string, email: string) {
    console.log("acionou o 2 metodo");

    const usuario: Usuario = {
      nome: nome,
      senha: senha,
      email: email,
    };
    this.httpClient.post<{ }>(
      'http://localhost:3000/api/usuarios',
      usuario
    ).subscribe((dados) => {
      this.usuarios.push(usuario);

      //this.listaClientesAtualizada.next([...this.clientes]);
    });
  }
}
