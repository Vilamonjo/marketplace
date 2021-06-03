import { Articulo } from "./articulo";
import { LineaPedido } from "./lineaPedido";

export class Pedido {
    id?:number;
    fecha: Date;
    nombre:string;
    idUsuario: number;
    articulosPedido: LineaPedido[];

    constructor(fecha: Date, nombre: string,idusuario: number ,articulosPedido: LineaPedido[]){
        this.fecha = fecha
        this.nombre = nombre;
        this.idUsuario = idusuario;
        this.articulosPedido =articulosPedido;
    }
}
