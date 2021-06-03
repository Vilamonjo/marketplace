import { Component, OnInit, OnChanges, Input, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { Articulo } from 'src/app/clases/articulo';
import { Pedido } from 'src/app/clases/pedido';
import { UserServiceService } from 'src/app/servicios/user-service.service';
import { ArticuloService } from 'src/app/servicios/articulo.service';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { ServicioDatosService } from 'src/app/servicios/servicio-datos.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  misUsuarios: Array<Usuario>;
  numeroUsuarios: number;

  misArticulos: Articulo[];
  numeroArticulos: number;

  misPedidos: Pedido[];
  numeroPedidos: number;

  usuarioLogged: Usuario;

  datosHijos: number;

  constructor(
    private servicioUser: UserServiceService,
    private servicioArticulos: ArticuloService,
    private servicioPedidos: PedidoService,
    private servicioDatos: ServicioDatosService,
    private route:Router
  ) { }

  ngOnInit(): void {
    this.servicioDatos.usuarioEnviado.subscribe(u => this.usuarioLogged = u);
    this.servicioUser.getUserList().subscribe((usuarios: Usuario[]) => (this.misUsuarios = usuarios) &&
    (this.numeroUsuarios = this.misUsuarios.length),
      error => console.error(error),
    () => console.log('Se ha cargado lista Usuarios'));

    this.servicioArticulos.getArticulos().subscribe((a: Articulo[]) => (this.misArticulos = a) &&
    (this.numeroArticulos = this.misArticulos.length),
    error => console.error(error),
    () => console.log('Se ha cargado lista Articulos'));

    this.servicioPedidos.getPedidos().subscribe((p: Pedido[]) => (this.misPedidos = p) &&
    (this.numeroPedidos = this.misPedidos.length),
    error => console.error(error),
    () => console.log('Se ha cargado lista Pedidos')); 


    
  }

  ngOnDoCheck():void{
    console.log('DO CHECK')
  }

  ngOnChanges(changes: SimpleChange){
    console.log('ON CHANGES')
  }

  irAUsuario(){  
    this.route.navigate(['/dashboard/usuario'])
  }
  
  irAArticulo(){  
    this.route.navigate(['/dashboard/articulo'])
  }
  irAPedido(){  
    this.route.navigate(['/dashboard/pedido'])
  }

  recibirDatosHijos($event){
    this.datosHijos = $event;
    this.actualizarDashboard(this.datosHijos);
  }

  actualizarDashboard(aux: number){
    switch(aux){
      case 1:{//ACTUALIZAR USUARIOS
        break;
      }
      case 2:{//ACTUALIZAR ARTICULOS
        break;
      }
      case 3:{//ACTUALIZAR PEDIDOS
        break;
      }
    }
  }

}
