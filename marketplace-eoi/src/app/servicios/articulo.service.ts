import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Articulo } from 'src/app/clases/articulo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  constructor(private http: HttpClient) {}
  articulos: Articulo[] = [];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  //CREAR ARTICULO
  postArticulo(articulo: Articulo): Observable<Articulo>{
    return this.http.post<Articulo>(`${environment.BACKEND_URL}/articulos`,articulo,this.httpOptions);
  }

  //OBTENER TODOS ARTICULOS
  getArticulos(): Observable<Articulo[]>{
    return this.http.get<Articulo[]>(`${environment.BACKEND_URL}/articulos`);
  }

  //ACTUALIZAR ARTICULO
  putArticulo(articulo:Articulo){
    return this.http.put<Articulo>(`${environment.BACKEND_URL}/articulos/${articulo.id}`,articulo,this.httpOptions);
  }

  //OBTENER ARTICULO POR ID
  getArticuloID(id:number): Observable<Articulo>{
    return this.http.get<Articulo>(`${environment.BACKEND_URL}/articulos/${id}`);
  }

  //OBTENER ARTICULOS POR NOMBRE PARCIAL
  getArticulosNombre(nombreParcial:string):Observable<Articulo[]>{
    return this.http.get<Articulo[]>(`${environment.BACKEND_URL}/articulos?nombre_like=${nombreParcial}`);
  }

  //BORRAR ARTICULO POR ID
  deleteArticulo(id:number){
    return this.http.delete(`${environment.BACKEND_URL}/articulos/${id}`);
  }
}
