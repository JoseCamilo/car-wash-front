import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedefinirComponent } from './redefinir.component';

describe('RedefinirComponent', () => {
  let component: RedefinirComponent;
  let fixture: ComponentFixture<RedefinirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RedefinirComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedefinirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
