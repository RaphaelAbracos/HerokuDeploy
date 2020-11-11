import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  constructor() { }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    senha: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  initializeFormGroup(){
    this.form.setValue({
      $key: null,
      name: '',
      email: '',
      senha: ''
    });
  }
}
