import { Injectable, signal} from '@angular/core';
import { Producto } from '../models/producto';


export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}



@Injectable({ providedIn: 'root' })
export class CarritoService {

  contador = signal(0);

  private items: ItemCarrito[] = [];

  agregar(producto: Producto) {
    const existe = this.items.find(i => i.producto.id === producto.id);
    if (existe) {
      existe.cantidad++;
    } else {
      this.items.push({ producto, cantidad: 1 });
    }

      //ACTUALIZA SIGNAL
     this.contador.set(this.contador() + 1);
  }

  obtener(): ItemCarrito[] {
    return this.items;
  }

  eliminar(id: number) {
  const item = this.items.find(i => i.producto.id === id);

  if (item) {
    this.contador.set(this.contador() - item.cantidad);
  }

  this.items = this.items.filter(i => i.producto.id !== id);
}

  limpiar() {
    this.items = [];
    this.contador.set(0);
  }

  total(): number {
    return this.items.reduce((sum, i) => sum + i.producto.precio * i.cantidad, 0);
  }

  conteo(): number {
    return this.items.reduce((sum, i) => sum + i.cantidad, 0);
  }
}