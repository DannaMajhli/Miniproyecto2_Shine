import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos';
import { Producto } from '../../models/producto';

@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  templateUrl: './producto-detalle.html',
  styleUrl: './producto-detalle.css'
})
export class ProductoDetalle {

  private ruta = inject(ActivatedRoute);
  private servicio = inject(ProductosService);

  producto?: Producto;

  ngOnInit() {
    this.ruta.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.producto = this.servicio.getProductoById(id);
    });
  }
}