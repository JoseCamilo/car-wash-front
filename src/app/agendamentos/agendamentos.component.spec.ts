import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendamentosComponent } from './agendamentos.component';

describe('AgendamentosComponent', () => {
  let component: AgendamentosComponent;
  let fixture: ComponentFixture<AgendamentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AgendamentosComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
