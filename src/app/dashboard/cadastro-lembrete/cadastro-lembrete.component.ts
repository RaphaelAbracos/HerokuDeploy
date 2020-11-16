import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
//import { Lembrete } from 'src/app/Lembrete/lembrete.model';
import { LembreteService } from '../../Lembrete/lembrete.service';

@Component({
  selector: 'app-cadastro-lembrete',
  templateUrl: './cadastro-lembrete.component.html',
  styleUrls: ['./cadastro-lembrete.component.css']
})
export class CadastroLembreteComponent  implements OnInit {

  constructor(public lembreteService: LembreteService) {

   }

   ngOnInit(): void {
  }

  onAdicionarLembrete(form: NgForm) {
    if(form.invalid){
      return
    }
    this.lembreteService.adicionarLembrete(
      form.value.nome,
      form.value.descricao,
      form.value.data
      );
      console.log(form.value);
      form.resetForm();
    }

}
