import { Component, inject } from '@angular/core';
import { ProductosService } from '../../services/productos';
import { Producto } from '../../models/producto';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class Productos {

  private servicio = inject(ProductosService);
  private router = inject(Router);
  private ruta = inject(ActivatedRoute);

  productos: Producto[] = [];
  categoriaActiva: string = '';

  ngOnInit() {
    this.ruta.queryParamMap.subscribe(params => {
      const categoria = params.get('categoria');
      this.categoriaActiva = categoria ?? '';

      if (categoria) {
        this.productos = this.servicio.getByCategoria(categoria);
      } else {
        this.productos = this.servicio.getProductos();
      }
    });
  }

  filtrar(categoria: string) {
    this.router.navigate(['/productos'], { queryParams: { categoria } });
  }

  mostrarTodos() {
    this.router.navigate(['/productos']);
  }

  agregar() {
    alert('Producto agregado 🛒');
  }

  verDetalle(id: number) {
    this.router.navigate(['/producto', id]);
  }
}