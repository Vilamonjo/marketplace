import { identifierModuleUrl } from '@angular/compiler';
import { stringify } from '@angular/compiler/src/util';
import { Component, Input, OnInit,Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/clases/pedido';
import { Usuario } from 'src/app/clases/usuario';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { UserServiceService } from 'src/app/servicios/user-service.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  
  usuarioModel : string = '';
  usuarios: Array<Usuario>; 
  usuariosEncontrados: Array<Usuario>;
  nuevoSeleccionado: boolean = false;
  consultaSeleccionado: boolean = false;
  actualizarSeleccionado: boolean = false;
  eliminarSeleccionado: boolean = false;
  formulario : FormGroup;
  usuario : Usuario;
  pedidos : Array<Pedido> = new Array <Pedido>();
  usuarioCreado: boolean = false;

  @Output()
  datoSalida: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private fb : FormBuilder,
    private route : Router,
    private servicioUser: UserServiceService
  ) {
    this.formulario = fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    }) 
   }

  ngOnInit(): void {
  }

  onKeyUpEvent(event: any){
    console.log(event.target.value);
    
  }

  
  nuevoClick(){
    this.consultaSeleccionado = false;
    this.nuevoSeleccionado = !this.nuevoSeleccionado;
  }

  consultaClick(){
    this.nuevoSeleccionado = false;
    this.consultaSeleccionado = !this.consultaSeleccionado;
  }
  actualizarClick(id:number){
    this.eliminarSeleccionado = false;
    this.actualizarSeleccionado = !this.actualizarSeleccionado;
  }
  eliminarClick(){
    this.actualizarSeleccionado = false;
    this.eliminarSeleccionado = !this.eliminarSeleccionado;
  }

  //ES CUTRE PERO VA
  /*reloadComponent() {
    let currentUrl = this.route.url;
        this.route.routeReuseStrategy.shouldReuseRoute = () => false;
        this.route.onSameUrlNavigation = 'reload';
        this.route.navigate([currentUrl]);
    }*/

  nuevoUsuario(){
    if (!this.formulario.valid){
      return console.log('Formulario no válido');
    }
    this.usuario = {
      nombre: this.formulario.value.usuario,
      password : this.formulario.value.password
    };
    this.servicioUser.postUser(this.usuario).subscribe((usuario) => {
      this.usuarioCreado = true;
      console.log('Se ha creado el usuario' + usuario.nombre);
    
    });
    //this.reloadComponent();
  }
  consultarUsuario(event : any){
    this.servicioUser.getUserNombre(event.target.value).subscribe((u: Usuario[]) =>{
      this.usuariosEncontrados = u;
    });
    this.route.navigate(['/dashboard/usuario/fichaUsuario'])     
  }

  enviarDatos(){
    this.datoSalida.emit(1);
  }
}
