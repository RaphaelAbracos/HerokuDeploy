import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
<<<<<<< HEAD
import { FormularioLoginComponent } from './Login/formulario-login/formulario-login.component';
=======
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './dashboard/menu/menu.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DbContentComponent } from './dashboard/db-content/db-content.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { CadastroLembreteComponent } from './dashboard/cadastro-lembrete/cadastro-lembrete.component';
import { routing } from './app.routing';
import { ExcluirLembreteComponent } from './dashboard/excluir-lembrete/excluir-lembrete.component';
>>>>>>> 3d030ad513d523bfd185191f0b7f07e30363f05f

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    FormularioLoginComponent
=======
    MenuComponent,
    DbContentComponent,
    CadastroLembreteComponent,
    ExcluirLembreteComponent,
>>>>>>> 3d030ad513d523bfd185191f0b7f07e30363f05f
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
