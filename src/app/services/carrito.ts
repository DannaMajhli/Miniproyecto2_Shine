import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

@Injectable({ providedIn: 'root' })
export class CarritoService {

  private items: ItemCarrito[] = [];

  agregar(producto: Producto) {
    const existe = this.items.find(i => i.producto.id === producto.id);
    if (existe) {
      existe.cantidad++;
    } else {
      this.items.push({ producto, cantidad: 1 });
    }
  }

  obtener(): ItemCarrito[] {
    return this.items;
  }

  eliminar(id: number) {
    this.items = this.items.filter(i => i.producto.id !== id);
  }

  limpiar() {
    this.items = [];
  }

  total(): number {
    return this.items.reduce((sum, i) => sum + i.producto.precio * i.cantidad, 0);
  }

  conteo(): number {
    return this.items.reduce((sum, i) => sum + i.cantidad, 0);
  }
}