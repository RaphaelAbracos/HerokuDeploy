import { Lembrete } from './lembrete.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LembreteService {
  constructor(private httpClient: HttpClient) {}

  private lembretes: Lembrete[] = [];
  private listaLembretesAtualizada = new Subject<Lembrete[]>();

  /* getLembretes(): void {
    this.httpClient
      .get<{ lembretes: any }>("http://localhost:3000/api/lembretes")
      .subscribe((dados) => {
        this.lembretes = dados.lembretes;
      });
  } */
  getLembretes(): void {
    this.httpClient.get<{lembretes: any}>(
      'http://localhost:3000/api/lembretes'
    )
    .pipe(map((dados) => {
      return dados.lembretes.map(lem => {
        return {
          //id: lem._id,
          nome: lem.nome,
          descricao: lem.descricao,
          data: lem.data,
          dataInicial: lem.dataInicial
        }
      })
    }))
    .subscribe((clientes) => {
      this.lembretes = clientes
      this.listaLembretesAtualizada.next([...this.lembretes])
    })
    //return [...this.clientes];
  }

  adicionarLembrete(nome: string, descricao: string, data: Date) {
    const lembrete: Lembrete = {
      nome: nome,
      descricao: descricao,
      data: data,
      dataInicial: new Date()
    };
    this.httpClient
      .post("http://localhost:3000/api/lembretes", lembrete)
      .subscribe((dados) => {
        console.log(dados);
        this.lembretes.push(lembrete);
        this.listaLembretesAtualizada.next([...this.lembretes]);
      });
  }

  getListaDeLembretesAtualizadaObservable() {
    return this.listaLembretesAtualizada.asObservable();
  }
}
