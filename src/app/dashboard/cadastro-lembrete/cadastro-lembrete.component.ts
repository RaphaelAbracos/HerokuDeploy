import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm, Validators } from '@angular/forms';
import { Lembrete } from 'src/app/Lembrete/lembrete.model';
import { LembreteService } from '../../Lembrete/lembrete.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
@Component({
  selector: 'app-cadastro-lembrete',
  templateUrl: './cadastro-lembrete.component.html',
  styleUrls: ['./cadastro-lembrete.component.css'],
})
export class CadastroLembreteComponent implements OnInit {


  public modo: string = 'criar';
  private idLembrete: string;
  public lembrete: Lembrete;
  public form: FormGroup;

  constructor(
    public lembreteService: LembreteService,
    public route: ActivatedRoute,
    public router: Router
  ) {

  }

  ngOnInit() {
    this.form = new FormGroup({
      nome: new FormControl('', {validators: [Validators.required, Validators.minLength(3)]}),
      descricao: new FormControl('', {validators: [Validators.required, Validators.maxLength(150), Validators.minLength(3)]}),
      data: new FormControl('', {validators: [Validators.required]}),
    })

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('idLembrete')) {
        this.modo = 'editar';
        this.idLembrete = paramMap.get('idLembrete');
        this.lembreteService
          .getLembrete(this.idLembrete)
          .subscribe((dadosLem) => {
            this.lembrete = {
              id: dadosLem._id,
              nome: dadosLem.nome,
              descricao: dadosLem.descricao,
              data: dadosLem.data,
              dataInicial: dadosLem.dataInicial,
            };
          });
      } else {
        this.modo = 'criar';
        this.idLembrete = null;
      }
    });
  }

  onAdicionarLembrete() {
    if (this.form.invalid) return;
    if (this.modo === 'criar') {
      this.lembreteService.adicionarLembrete(
        this.form.value.nome,
        this.form.value.descricao,
        this.form.value.data
      );
    }else {
      this.lembreteService.atualizarLembrete(
        this.idLembrete,
        this.form.value.nome,
        this.form.value.descricao,
        this.form.value.data,
        new Date()
      )
    }
    this.form.reset();
    this.router.navigate(['/mainMenu/dashboardList'])
  }

}
