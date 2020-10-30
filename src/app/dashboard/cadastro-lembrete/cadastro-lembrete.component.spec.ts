import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroLembreteComponent } from './cadastro-lembrete.component';

describe('CadastroLembreteComponent', () => {
  let component: CadastroLembreteComponent;
  let fixture: ComponentFixture<CadastroLembreteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroLembreteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroLembreteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
