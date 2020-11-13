import { Usuario } from './usuario.model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private usuarios: Usuario[] = [];
  getUsuario(): Usuario[] {
    return [...this.usuarios];
  }

  adicionarUsuario(nome: string, senha: string, email: string) {
    const usuario: Usuario = {
      nome: nome,
      senha: senha,
      email: email,
    };
    this.usuarios.push(usuario);
  }
}
