import { Component, OnInit, OnDestroy } from '@angular/core';
import { Lembrete } from '../../Lembrete/lembrete.model';
import { LembreteService } from '../../Lembrete/lembrete.service';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeBr from '@angular/common/locales/br';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-excluir-lembrete',
  templateUrl: './excluir-lembrete.component.html',
  styleUrls: ['./excluir-lembrete.component.css'],
})
export class ExcluirLembreteComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  constructor(
    private breakpointObserver: BreakpointObserver,
    public LembreteService: LembreteService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}
  lembretes: Lembrete[] = [];
  private lembreteSubscription: Subscription;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  ngOnInit(): void {
    registerLocaleData(localeBr, 'Br');
    this.LembreteService.getLembretes(localStorage.getItem('user'));
    this.lembreteSubscription = this.LembreteService
      .getListaDeLembretesAtualizadaObservable()
      .subscribe((lembretes: Lembrete[]) => {
        this.lembretes = lembretes;
      }
    );
  }
  ngOnDestroy(): void {
    this.lembreteSubscription.unsubscribe();
  }

  onDelete(id: string) {
    this.LembreteService.removerLembrete(id);
    this._snackBar.open('Lembrete removido', '', {
      duration: 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 },
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 },
      ];
    })
  );
}
