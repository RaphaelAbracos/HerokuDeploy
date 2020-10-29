import { Route } from '@angular/compiler/src/core';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroLembreteComponent } from './dashboard/cadastro-lembrete/cadastro-lembrete.component';
import { DbContentComponent } from './dashboard/db-content/db-content.component';
import { ExcluirLembreteComponent } from './dashboard/excluir-lembrete/excluir-lembrete.component';

const APP_ROUTES: Routes = [
  {path: 'excluir', component: ExcluirLembreteComponent},
  { path: 'cadastro', component: CadastroLembreteComponent},
  { path: '', component: DbContentComponent  }
];

export const routing: ModuleWithProviders<Route> = RouterModule.forRoot(APP_ROUTES);
