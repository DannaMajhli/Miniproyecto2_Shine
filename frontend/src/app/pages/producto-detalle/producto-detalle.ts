import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos';
import { Producto } from '../../models/producto';
import { CurrencyPipe } from '@angular/common';
import { CarritoService } from '../../services/carrito';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './producto-detalle.html',
  styleUrl: './producto-detalle.css'
})
export class ProductoDetalle implements OnInit {

  private ruta = inject(ActivatedRoute);
  private servicio = inject(ProductosService);
  private carritoService = inject(CarritoService);

  producto?: Producto;

  ngOnInit() {
    this.ruta.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      // subscribe porque getProductoPorId retorna Observable
      this.servicio.getProductoPorId(id).subscribe(data => {
        this.producto = data;
      });
    });
  }

  agregar() {
    if (this.producto) {
      this.carritoService.agregar(this.producto);
    }
  }
}