import { Component, inject } from '@angular/core';
import { ProductosService } from '../../services/productos';
import { Producto } from '../../models/producto';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductoCard } from '../../components/producto-card/producto-card';
import { PrecioPipe } from '../../pipes/precio-pipe';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [ProductoCard],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class Productos {

  private servicio = inject(ProductosService);
  private router = inject(Router);
  private ruta = inject(ActivatedRoute);

  productos: Producto[] = [];
  categoriaActiva: string = '';
  mensajeConfirmacion: string = '';

  ngOnInit() {
    this.ruta.queryParamMap.subscribe(params => {
      const categoria = params.get('categoria');
      this.categoriaActiva = categoria ?? '';
      this.productos = categoria
        ? this.servicio.getByCategoria(categoria)
        : this.servicio.getProductos();
    });
  }

  filtrar(categoria: string) {
    this.router.navigate(['/productos'], { queryParams: { categoria } });
  }

  mostrarTodos() {
    this.router.navigate(['/productos']);
  }

  onAgregado(producto: Producto) {
    this.mensajeConfirmacion = `"${producto.nombre}" agregado al carrito`;
    setTimeout(() => this.mensajeConfirmacion = '', 2500);
  }
}