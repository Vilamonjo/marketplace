import { Component, OnInit, ViewChild } from '@angular/core';
import { Articulo } from 'src/app/clases/articulo';
import { LineaPedido } from 'src/app/clases/lineaPedido';
import { Pedido } from 'src/app/clases/pedido';
import { ArticuloService } from 'src/app/servicios/articulo.service';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { ServicioPedidoArticuloService } from 'src/app/servicios/servicio-pedido-articulo.service';
import { MiniFichaArticuloComponent } from '../hijosDashboard/mini-ficha-articulo/mini-ficha-articulo.component';
import { ServicioDatosService } from 'src/app/servicios/servicio-datos.service'
import { Usuario } from 'src/app/clases/usuario';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {



  mostrarTodo: boolean = true;
  nuevoSeleccionado: boolean = false;
  consultaSeleccionado: boolean = false;
  pedidosEncontrados: Pedido[];
  articulosEncontrados: Articulo[];
  usuarioLogged: Usuario;

  @ViewChild(MiniFichaArticuloComponent,{static:false}) miniFicha:MiniFichaArticuloComponent;
  LinpedChild:LineaPedido;

  pedidosSize: number;//ID PEDIDO CUTRE
  nombreDePedido: string;

  constructor(
    private servicioPedidos: PedidoService,
    private servicioArticulo: ArticuloService,
    private servicioLinPed: ServicioPedidoArticuloService,
    private servicioDatos: ServicioDatosService
  ) {
    
   }

  ngOnInit(){
    this.servicioDatos.usuarioEnviado.subscribe(u => this.usuarioLogged = u);
    this.servicioPedidos.getPedidos().subscribe((p: Pedido[]) =>{
      this.pedidosSize = p.length;
    })
  }

  ngOnchanges(){
    console.log('soy un texto');
  }

  nuevoClick(){
    this.nuevoSeleccionado = !this.nuevoSeleccionado;
    this.consultaSeleccionado = false;
  }
  consultaClick(){
    this.consultaSeleccionado = !this.consultaSeleccionado;
    this.nuevoSeleccionado = false;
  }

  nuevoPedido(){
    this.servicioPedidos.getPedidos().subscribe((p: Pedido[]) =>{
      this.pedidosSize = p.length;//CUTRE CUTRE
    })

    this.servicioLinPed.getArticulosPedido(this.pedidosSize+1).subscribe((linPeds: LineaPedido[]) =>{;
      this.servicioPedidos.postPedido(new Pedido(
        new Date(), this.nombreDePedido,this.usuarioLogged.id,linPeds));
    })
  }

  ObtenerLinped(){
    this.LinpedChild = this.miniFicha.linPedPadre;
  }

  consultarPedidos(event:any){
    this.servicioPedidos.getPedidosNombre(event.target.value).subscribe((p: Pedido[]) =>{
      this.pedidosEncontrados = p;
    })
  }

  consultarArticulos(event:any){
    this.servicioArticulo.getArticulosNombre(event.target.value).subscribe((a: Articulo[]) =>{
      this.articulosEncontrados = a;
    });
  }

  nombrePedido(event:any){
    this.nombreDePedido = event.target.value;
  }

}
