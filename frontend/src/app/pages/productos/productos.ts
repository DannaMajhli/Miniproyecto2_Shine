import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { ProductosService } from '../../services/productos';
import { Producto } from '../../models/producto';
import { ActivatedRoute } from '@angular/router';
import { ProductoCard } from '../../components/producto-card/producto-card';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productos',
  imports: [ProductoCard, FormsModule],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class Productos implements OnInit, OnDestroy {
  private servicio = inject(ProductosService);
  private route = inject(ActivatedRoute);

  productos = signal<Producto[]>([]);
  ultimoAgregado = signal('');
  busqueda: string = '';
  private sub!: Subscription;

  get productosFiltrados(): Producto[] {
    if (!this.busqueda.trim()) return this.productos();
    return this.productos().filter(p =>
      p.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
    );
  }

  ngOnInit() {
    this.sub = this.route.queryParamMap.pipe(
      switchMap(params => {
        const categoria = params.get('categoria');
        this.productos.set([]);
        this.busqueda = '';
        return this.servicio.getProductos();
      })
    ).subscribe(data => {
      const categoria = this.route.snapshot.queryParamMap.get('categoria');
      if (categoria) {
        this.productos.set(data.filter(p => p.categoria === categoria));
      } else {
        this.productos.set([...data]);
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onAgregado(producto: Producto) {
    this.ultimoAgregado.set(producto.nombre);
    setTimeout(() => this.ultimoAgregado.set(''), 2000);
  }
}