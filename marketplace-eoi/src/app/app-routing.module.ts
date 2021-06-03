import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticulosComponent } from './componentes/articulos/articulos.component';
import { FichaArticuloComponent } from './componentes/hijosDashboard/ficha-articulo/ficha-articulo.component';
import { FichaUsuarioComponent } from './componentes/hijosDashboard/ficha-usuario/ficha-usuario.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { LoginComponent } from './componentes/login/login.component';
import { PedidosComponent } from './componentes/pedidos/pedidos.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'articulo',
        component: ArticulosComponent,
        children:[{
          path: 'fichaArticulo',
          component: FichaArticuloComponent
        }]
      },
      {
        path: 'usuario',
        component: UsuariosComponent,
        children:[{
          path: 'fichaUsuario',
          component: FichaUsuarioComponent
        }]
      },
      {
        path: 'pedido',
        component: PedidosComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
