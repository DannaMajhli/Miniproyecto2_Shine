import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  productos: Producto[] = [
    {
      id: 1,
      nombre: 'Blusa negra elegante',
      precio: 299,
      imagen: 'https://via.placeholder.com/150',
      categoria: 'mujer'
    },
    {
      id: 2,
      nombre: 'Vestido floral',
      precio: 450,
      imagen: 'https://via.placeholder.com/150',
      categoria: 'mujer'
    },
    {
      id: 3,
      nombre: 'Sudadera oversize',
      precio: 399,
      imagen: 'https://via.placeholder.com/150',
      categoria: 'hombre'
    }
  ];

  getProductos() {
    return this.productos;
  }

  getProductoById(id: number) {
  return this.productos.find(p => p.id === id);
}
}