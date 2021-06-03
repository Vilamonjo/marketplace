import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Articulo } from 'src/app/clases/articulo';
import { ArticuloService } from 'src/app/servicios/articulo.service';


@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {

  
  constructor(
    private route: Router,
    private fb: FormBuilder, 
    private servicioArticulo: ArticuloService) {
      this.formulario = fb.group({
        nombreArticulo: ['', Validators.required],
        precio: ['', Validators.required],
        stock: ['',Validators.required]
      }) 
   }
  

  @Output()
  datoSalida: EventEmitter<number> = new EventEmitter<number>();
  
  mostrarTodo: boolean = true;
  nuevoSeleccionado: boolean = false;
  consultaSeleccionado: boolean = false;
  nombreArticulo: string;
  precio: number;
  stock: number;

  articulo: Articulo = new Articulo('',0,0);
  articulosEncontrados: Articulo[];

  formulario: FormGroup;

  ngOnInit(): void {
  }

  ngModule(){
    imports: [CommonModule]
  };

  nuevoClick(){
    this.mostrarTodo = true;
    this.consultaSeleccionado = false;
    this.nuevoSeleccionado = !this.nuevoSeleccionado;    
  }

  consultaClick(){
    this.mostrarTodo = true;
    this.nuevoSeleccionado = false;
    this.consultaSeleccionado = !this.consultaSeleccionado;
  }

  nuevoArticulo(){
    this.articulo.nombre = this.formulario.value.nombreArticulo;
    this.articulo.precio = this.formulario.value.precio;
    this.articulo.stock = this.formulario.value.stock;
    this.servicioArticulo.postArticulo(this.articulo).subscribe();
    this.mostrarTodo = false;
    this.enviarDatos();
  }

  consultarArticulos(event:any){
    this.servicioArticulo.getArticulosNombre(event.target.value).subscribe((a: Articulo[]) =>{
      this.articulosEncontrados = a;
    });
    this.route.navigate(['/dashboard/articulo/fichaArticulo'])
  }

  enviarDatos(){
    this.datoSalida.emit(2);
  }

}
