import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {Usuario} from 'src/app/clases/usuario';
import { Observable } from 'rxjs';

@Injectable()
export class UserServiceService {

  constructor(private http: HttpClient) {}
  usuarios: Usuario[] = [];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  //OBTIENE TODOS LOS USUARIOS
  getUserList(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${environment.BACKEND_URL}/usuarios`);
  }

  //OBTENER USARIOS POR NOMBRE
  getUserNombre(nombre: String): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${environment.BACKEND_URL}/usuarios?nombre_like=${nombre}`)
  }

  //AÑADE USUARIO
  postUser(usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(`${environment.BACKEND_URL}/usuarios`,usuario,this.httpOptions);
  }

  //ACTUALIZAR
  putUser(usuario:Usuario){
    return this.http.put<Usuario>(`${environment.BACKEND_URL}/usuarios/${usuario.id}`,usuario,this.httpOptions);
  }

  //BORRAR USUARIO
  deleteUser(usuario:Usuario){
    return this.http.delete(`${environment.BACKEND_URL}/usuarios/${usuario.id}`,this.httpOptions);

  }
}
