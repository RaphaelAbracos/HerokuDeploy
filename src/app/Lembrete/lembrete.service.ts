import { Lembrete } from './lembrete.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LembreteService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  private lembretes: Lembrete[] = [];
  private listaLembretesAtualizada = new Subject<Lembrete[]>();



  getLembrete(idLembretes: string) {
    //return {...this.clientes.find((cli) => cli.id === idCliente)};
    return this.httpClient.get<{
      _id: string, nome: string, descricao: string, data: Date, dataInicial: Date
    }>(`http://localhost:3000/api/lembretes/${idLembretes}`);
  }
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
          id: lem._id,
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
      id:null,
      nome: nome,
      descricao: descricao,
      data: data,
      dataInicial: new Date()
    };
    this.httpClient
      .post("http://localhost:3000/api/lembretes", lembrete)
      .subscribe((dados) => {
        this.lembretes.push(lembrete);
        this.listaLembretesAtualizada.next([...this.lembretes]);
      });
  }

  getListaDeLembretesAtualizadaObservable() {
    return this.listaLembretesAtualizada.asObservable();
  }

  removerLembrete(id: string): void {
    this.httpClient.delete(
      `http://localhost:3000/api/lembretes/${id}`
    ).subscribe(() => {
      this.lembretes = this.lembretes.filter((lem) => {
        return lem.id !== id;
      })
      this.listaLembretesAtualizada.next([...this.lembretes]);
    });
  }

  atualizarLembrete(id: string, nome: string, descricao: string, data: Date, dataInicial: Date) {
    const lembrete: Lembrete = { id, nome, descricao, data , dataInicial };
    this.httpClient.put(`http://localhost:3000/api/lembretes/${id}`, lembrete)
      .subscribe((res => {
        const copia = [...this.lembretes];
        const indice = copia.findIndex(lem => lem.id === lembrete.id);
        copia[indice] = lembrete;
        this.lembretes = copia;
        this.listaLembretesAtualizada.next([...this.lembretes]);
        this.router.navigate(['/mainMenu/dashboardList']);
      }));
  }
}
