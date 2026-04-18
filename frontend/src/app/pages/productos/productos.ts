import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { ProductosService } from '../../services/productos';
import { Producto } from '../../models/producto';
import { ActivatedRoute } from '@angular/router';
import { ProductoCard } from '../../components/producto-card/producto-card';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-productos',
  imports: [ProductoCard],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class Productos implements OnInit, OnDestroy {
  private servicio = inject(ProductosService);
  private route = inject(ActivatedRoute);

  productos = signal<Producto[]>([]);
  ultimoAgregado = signal('');
  private sub!: Subscription;

  ngOnInit() {
    this.sub = this.route.queryParamMap.pipe(
      switchMap(params => {
        const categoria = params.get('categoria');
        this.productos.set([]);
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