import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniFichaArticuloComponent } from './mini-ficha-articulo.component';

describe('MiniFichaArticuloComponent', () => {
  let component: MiniFichaArticuloComponent;
  let fixture: ComponentFixture<MiniFichaArticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiniFichaArticuloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniFichaArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
