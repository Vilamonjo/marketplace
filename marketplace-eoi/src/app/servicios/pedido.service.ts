import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {Pedido} from 'src/app/clases/pedido';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private http: HttpClient) {}
  pedidos: Pedido[] = [];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  //CREAR PERIDO
  postPedido(pedido: Pedido): Observable<Pedido>{
    return this.http.post<Pedido>(`${environment.BACKEND_URL}/pedidos`,pedido,this.httpOptions);
  }

  //OBTENER TODOS LOS PEDIDOS
  getPedidos(): Observable<Pedido[]>{
    return this.http.get<Pedido[]>(`${environment.BACKEND_URL}/pedidos`);
  }

  //ACTUALIZAR PEDIDO :ID
  putPedido(pedido: Pedido){
    return this.http.put<Pedido>(`${environment.BACKEND_URL}/pedidos/${pedido.id}`,pedido,this.httpOptions);
  }

  //OBTENER PEDIDO POR ID
  getPedidoId(id: number): Observable<Pedido>{
    return this.http.get<Pedido>(`${environment.BACKEND_URL}/pedidos/${id}`);
  }

  //OBTENER PEDIDOS POR IDUSUARIO
  getpedidosIdUser(id:number):Observable<Pedido[]>{
    return this.http.get<Pedido[]>(`${environment.BACKEND_URL}/pedidos?idUsuario=${id}`);
  }

  //OBTENER PEDIDO POR NOMBRE PARCUAL
  getPedidosNombre(nombreParcial:string):Observable<Pedido[]>{
    return this.http.get<Pedido[]>(`${environment.BACKEND_URL}/pedidos?nombre_like=${nombreParcial}`);
  }

  //BORRAR PEDIDOS
  deletePedido(pedido:Pedido){
    return this.http.delete(`${environment.BACKEND_URL}/pedidos/${pedido.id}`,this.httpOptions);
  }
}
