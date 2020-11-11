import { Component, OnInit } from '@angular/core';
import { CadastroService } from '../../shared/cadastro.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-formulario-cadastro',
  templateUrl: './formulario-cadastro.component.html',
  styleUrls: ['./formulario-cadastro.component.css']
})
export class FormularioCadastroComponent implements OnInit {

  constructor(public service: CadastroService, public dialogRef: MatDialogRef<FormularioCadastroComponent>) { }

  ngOnInit(): void {
  }

  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onClose(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }
}
