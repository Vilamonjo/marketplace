import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Articulo } from 'src/app/clases/articulo';
import { LineaPedido } from 'src/app/clases/lineaPedido';
import { Pedido } from 'src/app/clases/pedido';
import { ArticuloService } from 'src/app/servicios/articulo.service'
import { PedidoService } from 'src/app/servicios/pedido.service';
import { ServicioPedidoArticuloService } from 'src/app/servicios/servicio-pedido-articulo.service';


@Component({
  selector: 'app-mini-ficha-articulo',
  templateUrl: './mini-ficha-articulo.component.html',
  styleUrls: ['./mini-ficha-articulo.component.css']
})
export class MiniFichaArticuloComponent implements OnInit {

  @Input()
  articuloLlegada: Articulo;

  pedidosSize:number;//MANERA CUTRE DE OBTENER EL ULTIMO ID

  linPedPadre: LineaPedido;


  formulario: FormGroup;

  demasiadosItems: boolean = false;
  demasiadosPocosIntems: boolean = false;

  constructor(
    private fb: FormBuilder,
    private servicioArticulos: ArticuloService,
    private servicioPedidos: PedidoService,
    private serviciosLinped: ServicioPedidoArticuloService
  ) {
    this.formulario = fb.group({cantidad:['',Validators.required]});
  } 

  ngOnInit(): void {
    this.servicioPedidos.getPedidos().subscribe((p: Pedido[]) =>{
      this.pedidosSize = p.length;
    })
  }

  anyadirArticulo(){
    if(this.formulario.value.cantidad > this.articuloLlegada.stock) {
      this.demasiadosItems = true;
      this.demasiadosPocosIntems = false;
    }else if(this.formulario.value.cantidad < 0){
      this.demasiadosPocosIntems = true;
      this.demasiadosItems = false;
    }else{
      this.articuloLlegada.stock = 
        this.articuloLlegada.stock-this.formulario.value.cantidad
      this.servicioArticulos.putArticulo(this.articuloLlegada).subscribe();
      this.linPedPadre = new LineaPedido(
        this.pedidosSize+1,
        this.articuloLlegada.id,
        this.formulario.value.cantidad);
      this.serviciosLinped.postLinPed(this.linPedPadre).subscribe();
    }
  }

}
