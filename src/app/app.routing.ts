import { Route } from '@angular/compiler/src/core';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { CadastroLembreteComponent } from './dashboard/cadastro-lembrete/cadastro-lembrete.component';
import { DbContentComponent } from './dashboard/db-content/db-content.component';
import { ExcluirLembreteComponent } from './dashboard/excluir-lembrete/excluir-lembrete.component';
import { MenuComponent } from './dashboard/menu/menu.component';
import { FormularioLoginComponent } from './Login/formulario-login/formulario-login.component';

const APP_ROUTES: Routes = [

  {path: 'mainMenu', component: MenuComponent,canActivate: [AuthGuard], children:[
    {path: 'excluir', component: ExcluirLembreteComponent},
    {path: 'cadastro', component: CadastroLembreteComponent},
    {path: 'dashboardList', component: DbContentComponent },
    {path: 'editar/:idLembrete', component: CadastroLembreteComponent}
  ]},
  {path: '', component: FormularioLoginComponent},
  {path: 'login', redirectTo:'', pathMatch: 'full'}, 
  {
    path: "**",
    redirectTo:""
  }
];

export const routing: ModuleWithProviders<Route> = RouterModule.forRoot(APP_ROUTES);
