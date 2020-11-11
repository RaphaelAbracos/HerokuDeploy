import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FormularioCadastroComponent } from 'src/app/cadastro/formulario-cadastro/formulario-cadastro.component';
import { CadastroService } from '../../shared/cadastro.service';

@Component({
  selector: 'app-formulario-login',
  templateUrl: './formulario-login.component.html',
  styleUrls: ['./formulario-login.component.css']
})
export class FormularioLoginComponent implements OnInit {

  constructor(private dialog: MatDialog, public service: CadastroService) { }

  ngOnInit(): void {
  }

  onCreate(){
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(FormularioCadastroComponent, dialogConfig);
  }

}
