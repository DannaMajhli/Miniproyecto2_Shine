import { Component, inject, OnInit, OnDestroy } from '@angular/core';
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

  productos: Producto[] = [];
  ultimoAgregado: string = '';
  private sub!: Subscription;

  ngOnInit() {
    this.sub = this.route.queryParamMap.pipe(
      switchMap(params => {
        const categoria = params.get('categoria');
        console.log('CATEGORIA RECIBIDA:', categoria);
        this.productos = [];
        return this.servicio.getProductos();
      })
    ).subscribe(data => {
      const categoria = this.route.snapshot.queryParamMap.get('categoria');
      console.log('DATOS RECIBIDOS:', data.length, 'FILTRANDO POR:', categoria);
      if (categoria) {
        this.productos = [...data.filter(p => p.categoria === categoria)];
      } else {
        this.productos = [...data];
      }
      console.log('PRODUCTOS FINALES:', this.productos.length);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onAgregado(producto: Producto) {
    this.ultimoAgregado = producto.nombre;
    setTimeout(() => this.ultimoAgregado = '', 2000);
  }
}