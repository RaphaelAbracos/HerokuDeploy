import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormularioLoginComponent } from './Login/formulario-login/formulario-login.component';

@NgModule({
  declarations: [
    AppComponent,
    FormularioLoginComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
