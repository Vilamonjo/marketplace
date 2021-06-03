import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from 'src/app/clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class ServicioDatosService {

  private usuario = new BehaviorSubject(new Usuario('',''));
  usuarioEnviado = this.usuario.asObservable();

  constructor() { }

  enviarUsuarioLogeado(usuario: Usuario){
    this.usuario.next(usuario);
  }
}
