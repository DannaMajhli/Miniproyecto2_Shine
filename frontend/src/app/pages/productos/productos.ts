import { Component, inject, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos';
import { Producto } from '../../models/producto';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ProductoCard } from '../../components/producto-card/producto-card';

@Component({
  selector: 'app-productos',
  imports: [RouterLink, ProductoCard],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class Productos implements OnInit {
  private servicio = inject(ProductosService);
  private route = inject(ActivatedRoute);

  productos: Producto[] = [];
  ultimoAgregado: string = '';   // para mostrar feedback del @Output

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const categoria = params.get('categoria');

      this.servicio.getProductos().subscribe(data => {
        if (categoria) {
          this.productos = data.filter(p => p.categoria === categoria);
        } else {
          this.productos = data;
        }
      });
    });
  }

  onAgregado(producto: Producto) {
    // Aquí capturas el @Output de la card
    this.ultimoAgregado = producto.nombre;

    // Limpiar el mensaje después de 2 segundos
    setTimeout(() => this.ultimoAgregado = '', 2000);
  }
}