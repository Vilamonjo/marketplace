import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaPedidoComponent } from './ficha-pedido.component';

describe('FichaPedidoComponent', () => {
  let component: FichaPedidoComponent;
  let fixture: ComponentFixture<FichaPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaPedidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
