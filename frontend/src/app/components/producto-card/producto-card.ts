import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { Producto } from '../../models/producto';
import { CarritoService } from '../../services/carrito';
import { Router } from '@angular/router';
import { PrecioPipe } from '../../pipes/precio-pipe';

@Component({
  selector: 'app-producto-card',
  standalone: true,
  imports: [PrecioPipe],
  templateUrl: './producto-card.html',
  styleUrl: './producto-card.css'
})
export class ProductoCard {

  @Input() producto!: Producto;
  @Output() agregado = new EventEmitter<Producto>();

  private carritoService = inject(CarritoService);
  private router = inject(Router);

  agregar(event: Event) {
    event.stopPropagation();
    this.carritoService.agregar(this.producto);
    this.agregado.emit(this.producto);
  }

  verDetalle() {
    this.router.navigate(['/producto', this.producto.id]);
  }
}