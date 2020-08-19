import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LojaDadosComponent } from './loja-dados.component';

describe('LojaDadosComponent', () => {
  let component: LojaDadosComponent;
  let fixture: ComponentFixture<LojaDadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LojaDadosComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LojaDadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
