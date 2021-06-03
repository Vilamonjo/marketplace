import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Articulo } from 'src/app/clases/articulo';
import { ArticuloService } from 'src/app/servicios/articulo.service';

@Component({
  selector: 'app-ficha-articulo',
  templateUrl: './ficha-articulo.component.html',
  styleUrls: ['./ficha-articulo.component.css']
})
export class FichaArticuloComponent implements OnInit {

  @Input()
  articuloLlegada: Articulo;

  mostrarTodo: boolean = true;
  actualizarSeleccionado: boolean = false;
  borrarSeleccionado: boolean = false;

  formulario: FormGroup;



  constructor(
    private ruta: ActivatedRoute,
    private servicioArticulo: ArticuloService,
    private fb: FormBuilder
  ) {
    this.formulario = fb.group({
      nombre:['',Validators.required],
      precio:['',Validators.required],
      stock:['',Validators.required]
    });
   }

  ngOnInit(): void {

  }

  actualizarArticulo(){
    this.articuloLlegada.nombre = this.formulario.value.nombre;
    this.articuloLlegada.precio = this.formulario.value.precio;
    this.articuloLlegada.stock = this.formulario.value.stock;
    //this.servicioArticulo.putArticulo(this.articuloLlegada).subscribe();
    this.mostrarTodo = false;
  }

  borrarArticulo(){
    this.servicioArticulo.deleteArticulo(this.articuloLlegada.id).subscribe();
    this.mostrarTodo = false;
  }

  actualizarClick(){
    this.actualizarSeleccionado = !this.actualizarSeleccionado;
    this.borrarSeleccionado = false;
  }

  borrarClick(){
    this.borrarSeleccionado = !this.borrarSeleccionado;
    this.actualizarSeleccionado = false;
  }

}
