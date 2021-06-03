
export class LineaPedido {
    id?: number;
    idPedido: number;
    idArticulo: number;
    cantidadArticulo: number;

    constructor(idPedido: number, idArticulo: number, cantidadArticulo: number){
        this.idPedido = idPedido
        this.idArticulo = idArticulo;
        this.cantidadArticulo =cantidadArticulo;
    }
}
