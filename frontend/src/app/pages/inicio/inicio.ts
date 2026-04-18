import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from '../../services/productos';
import { Producto } from '../../models/producto';
import { ProductoCard } from '../../components/producto-card/producto-card';

@Component({
  selector: 'app-inicio',
  imports: [ProductoCard],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio implements OnInit {
  private servicio = inject(ProductosService);
  private router = inject(Router);

  destacados = signal<Producto[]>([]);

  ngOnInit() {
    this.servicio.getProductos().subscribe(data => {
      this.destacados.set(data.slice(0, 4));
    });
  }

  irCategoria(categoria: string) {
    this.router.navigate(['/productos'], {
      queryParams: categoria ? { categoria } : {}
    });
  }
}