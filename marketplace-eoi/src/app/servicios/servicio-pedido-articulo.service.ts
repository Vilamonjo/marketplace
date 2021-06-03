import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {Pedido} from 'src/app/clases/pedido';
import { Observable } from 'rxjs';
import { LineaPedido } from '../clases/lineaPedido';

@Injectable({
  providedIn: 'root'
})
export class ServicioPedidoArticuloService {

  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  //OBTIENE TODOS LOS ARTICULOS DE UN PEDIDO
  getArticulosPedido(idPedido:number): Observable<LineaPedido[]>{
    return this.http.get<LineaPedido[]>(`${environment.BACKEND_URL}/pedidoArticulos?idPedido_like=${idPedido}`); 
  }

  /*return this.http.post<Articulo>(`${environment.BACKEND_URL}/articulos`,articulo,this.httpOptions); */

  //AÑADE UNA LINPED
  postLinPed(linPed: LineaPedido): Observable<LineaPedido>{
    return this.http.post<LineaPedido>(`${environment.BACKEND_URL}/pedidoArticulos`,linPed,this.httpOptions);
  }

  //BORRA LINPED
  deleteLinPed(id:number){
    return this.http.delete(`${environment.BACKEND_URL}/pedidoArticulos/${id}`,this.httpOptions);
  }
}
