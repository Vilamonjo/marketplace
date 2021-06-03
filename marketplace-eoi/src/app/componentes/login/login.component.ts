import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { UserServiceService } from 'src/app/servicios/user-service.service';
import { ServicioDatosService } from 'src/app/servicios/servicio-datos.service';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { Pedido } from 'src/app/clases/pedido';
//import { CustompipePipe} from 'src/app/custom-pipe.pipe';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo = 'Pantalla de login';
  misUsuarios : Array<Usuario>;
  totalUsuarios: number;
  usuarioLogin: Usuario = new Usuario("","");
  
  //---------------------------------------------------------------------
  // COMPROBACION USUSARIO CON ?NOMBRE_LIKE CONTRASEÑA_LIKE ¿?
  pedidosTest: Pedido[];
  //------------------------------------------------------------------

  constructor(private servicioUser: UserServiceService,
    private servicioDatos: ServicioDatosService, 
    private route: Router,
    private servicioPedidos: PedidoService) { 
  }

  ngOnInit(): void {
    this.servicioUser.getUserList().subscribe((usuarios: Usuario[]) => (this.misUsuarios = usuarios),
      error => console.error(error),
      () => console.log('Se ha cargado lista Usuarios')
    );
  }

  getNombreInput(event:any){
    this.usuarioLogin.nombre = event.target.value;
  }

  getPasswordInput(event:any){
    this.usuarioLogin.password = event.target.value;
  }

  iniciarSesion(){
    /*console.log(this.misUsuarios);
    console.log(this.usuariodeprueba.nombre+" "+this.usuariodeprueba.password)*/
    let usuarioComprobar: Usuario[] = this.comprobarUsuario(this.misUsuarios,this.usuarioLogin);
    if(usuarioComprobar.length < 1){
      console.log('usuario incorrecto');
    } else{
      console.log('usuario correcto');
      this.servicioUser.getUserNombre(this.usuarioLogin.nombre).subscribe((u: Usuario[]) => {
        this.usuarioLogin = u[0];
        this.enviarUsuarioLogeado(this.usuarioLogin);
      }); 
      this.route.navigate(['dashboard'])
    }
  }

    //DEVUELVE UN ARRAY, SERA VACIO SI EL USUARIO ES INCORRECTO, O UN UNICO VALOR SI EL USUARIO ES CORRECTO
    comprobarUsuario(usuarios: Usuario[], usuarioComprobar: Usuario){
      return usuarios.filter(u =>
        (u.nombre == usuarioComprobar.nombre)&&
        (u.password == usuarioComprobar.password))
    }

    enviarUsuarioLogeado(usuarioLogeado: Usuario){
      this.servicioDatos.enviarUsuarioLogeado(usuarioLogeado);
    }

  funcionTest(){
    //NO BORRAR, SIRVE PARA LUEGO
    //this.servicioUser.postUser(this.usuariodeprueba).subscribe(usuario => this.misUsuarios.push(this.usuariodeprueba));
    this.servicioPedidos.getpedidosIdUser(1).subscribe((p: Pedido[])=> {
      this.pedidosTest = p;
      //this.pipe.transform(this.pedidosTest);
    });
    
  }
}