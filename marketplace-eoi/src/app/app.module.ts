import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { ArticulosComponent } from './componentes/articulos/articulos.component';
import { PedidosComponent } from './componentes/pedidos/pedidos.component';
import { UserServiceService } from './servicios/user-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticuloService } from './servicios/articulo.service';
import { PedidoService } from './servicios/pedido.service';
import { FichaUsuarioComponent } from './componentes/hijosDashboard/ficha-usuario/ficha-usuario.component';
import { FichaArticuloComponent } from './componentes/hijosDashboard/ficha-articulo/ficha-articulo.component';
import { FichaPedidoComponent } from './componentes/hijosDashboard/ficha-pedido/ficha-pedido.component';
import { MiniFichaArticuloComponent } from './componentes/hijosDashboard/mini-ficha-articulo/mini-ficha-articulo.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    UsuariosComponent,
    ArticulosComponent,
    PedidosComponent,
    FichaUsuarioComponent,
    FichaArticuloComponent,
    FichaPedidoComponent,
    MiniFichaArticuloComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [UserServiceService,
    ArticuloService, 
    PedidoService,],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
