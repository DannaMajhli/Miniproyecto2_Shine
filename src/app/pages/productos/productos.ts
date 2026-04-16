import { Component, inject } from '@angular/core';
import { ProductosService } from '../../services/productos';
import { Producto } from '../../models/producto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  standalone: true,
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class Productos {

  private servicio = inject(ProductosService);

  productos: Producto[] = [];

  ngOnInit() {
    this.productos = this.servicio.getProductos();
  }

  agregar() {
  alert('Producto agregado 🛒');
}

private router = inject(Router);

verDetalle(id: number) {
  this.router.navigate(['/producto', id]);
}
}
