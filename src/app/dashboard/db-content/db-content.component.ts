import { Component, OnInit, OnDestroy } from '@angular/core';
import { Lembrete } from '../../Lembrete/lembrete.model';
import { LembreteService } from '../../Lembrete/lembrete.service';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-db-content',
  templateUrl: './db-content.component.html',
  styleUrls: ['./db-content.component.css']
})
export class DbContentComponent implements OnInit, OnDestroy {
  /** Based on the screen size, switch from standard to one column per row */
  constructor(private breakpointObserver: BreakpointObserver, public LembreteService: LembreteService) {}
  lembretes: Lembrete[] = [];
  private lembreteSubscription: Subscription;

  ngOnInit(): void{
    this.LembreteService.getLembretes();
    this.lembreteSubscription = this.LembreteService
      .getListaDeLembretesAtualizadaObservable()
      .subscribe((lembretes: Lembrete[]) => {
        this.lembretes = lembretes;
      })

  }
  ngOnDestroy(): void{
    this.lembreteSubscription.unsubscribe();
  }

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

}
