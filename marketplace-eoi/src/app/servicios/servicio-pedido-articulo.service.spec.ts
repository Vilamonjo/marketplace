import { TestBed } from '@angular/core/testing';

import { ServicioPedidoArticuloService } from './servicio-pedido-articulo.service';

describe('ServicioPedidoArticuloService', () => {
  let service: ServicioPedidoArticuloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioPedidoArticuloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
