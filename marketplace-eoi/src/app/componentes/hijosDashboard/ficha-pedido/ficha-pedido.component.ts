import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Articulo } from 'src/app/clases/articulo';
import { ArticuloService } from 'src/app/servicios/articulo.service';
import { Pedido } from 'src/app/clases/pedido';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { ServicioPedidoArticuloService} from 'src/app/servicios/servicio-pedido-articulo.service';
import { LineaPedido } from 'src/app/clases/lineaPedido';

@Component({
  selector: 'app-ficha-pedido',
  templateUrl: './ficha-pedido.component.html',
  styleUrls: ['./ficha-pedido.component.css']
})
export class FichaPedidoComponent implements OnInit {

  @Input()
  pedidoLlegada: Pedido;
  articuloLlegada: Articulo;
  articulos: Articulo[];

  totalPedido: number = 0;

  borrarSeleccionado: boolean = false;
  mostrarTodo: boolean = true;


  constructor(   
    private ruta: ActivatedRoute,
    private servicioArticulo: ArticuloService,
    private servicioPedido: PedidoService,
    private servicioLinPed: ServicioPedidoArticuloService) { }

  ngOnInit(): void {
    this.pedidoLlegada.articulosPedido.forEach((linPed: LineaPedido) =>{
      this.servicioArticulo.getArticuloID(linPed.idArticulo).subscribe((a: Articulo)=>{//MENDIANTE EL LINPED, OBTENEMOS EL ARTICULO, Y SU PRECIO
        this.totalPedido = 
          this.totalPedido + this.calcularTotalArticulo(linPed.cantidadArticulo, a.precio)
      });    
      
    })//END

    
  }

  borrarPedido(){
    //ANTES DE BORRAR EL PEDIDO, BORRAMOS SUS LINEAS
    this.pedidoLlegada.articulosPedido.forEach((l: LineaPedido) =>{
      this.servicioLinPed.deleteLinPed(l.id).subscribe();
    })
    this.servicioPedido.deletePedido(this.pedidoLlegada).subscribe();
  }

  borrarClick(){
    this.borrarSeleccionado = true;
  }

  calcularTotalArticulo(a: number, b:number){
    return a*b;
  }
}
