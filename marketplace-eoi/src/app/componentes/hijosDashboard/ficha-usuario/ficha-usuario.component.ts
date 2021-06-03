import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';
import { UserServiceService } from 'src/app/servicios/user-service.service';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pedido } from 'src/app/clases/pedido';

@Component({
  selector: 'app-ficha-usuario',
  templateUrl: './ficha-usuario.component.html',
  styleUrls: ['./ficha-usuario.component.css']
})
export class FichaUsuarioComponent implements OnInit {

  constructor(
    private fb:FormBuilder,
    private servicioUsuarios: UserServiceService,
    private servicioPedidos: PedidoService
  ){
    this.formulario = fb.group({
      nombre:['',Validators.required],
    });
  }

   

  @Input()
  usuarioLlegada: Usuario;

  formulario: FormGroup;

  mostrarTodo: boolean = true;
  actualizarSeleccionado: boolean = false;
  borrarSeleccionado: boolean = false;
  cantidadPedidos: number = 0;


  ngOnInit(): void {
    this.servicioPedidos.getpedidosIdUser(this.usuarioLlegada.id).subscribe((p: Pedido[]) =>{
      this.cantidadPedidos = p.length;
    })
  }

  actualizarClick(){
    this.mostrarTodo = true;
    this.actualizarSeleccionado = !this.actualizarSeleccionado;
    this.borrarSeleccionado = false;
  }

  borrarClick(){
    this.mostrarTodo = true;
    this.borrarSeleccionado = !this.borrarSeleccionado;
    this.actualizarSeleccionado = false;
  }

  borrarUsuario(){
    this.servicioUsuarios.deleteUser(this.usuarioLlegada).subscribe();
    this.mostrarTodo = false;
  }

  actualizarUsuario(){
    this.usuarioLlegada.nombre = this.formulario.value.nombre;
    this.servicioUsuarios.putUser(this.usuarioLlegada).subscribe();
    this.mostrarTodo = false;
  }

}
