import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormularioCadastroComponent } from 'src/app/cadastro/formulario-cadastro/formulario-cadastro.component';
import { CadastroService } from '../../shared/cadastro.service';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../../Usuario/usuario.service';

import { ActivatedRoute, Router } from '@angular/router'; 

/*import{ app} from '../../../../backend/app';
//import { app } from '../../Usuario/usuario.service';*/

@Component({
  selector: 'app-formulario-login',
  templateUrl: './formulario-login.component.html',
  styleUrls: ['./formulario-login.component.css'],
})
export class FormularioLoginComponent implements OnInit {
  constructor(
    public router: Router,
    private dialog: MatDialog,
    public service: CadastroService,
    public usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {}

  onCreate() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(FormularioCadastroComponent, dialogConfig);
  }

  onLogar(form: NgForm) {

    this.usuarioService.logar(form.value.email, form.value.senha)
      .subscribe((response: any)=>{
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.usuario));
    
        form.resetForm();
        this.router.navigate(['/mainMenu/dashboardList']);
      })
  
  }
}
