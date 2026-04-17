import { Component, inject } from '@angular/core';
import { CarritoService, ItemCarrito } from '../../services/carrito';
import { Router, RouterLink } from '@angular/router';
import { PrecioPipe } from '../../pipes/precio-pipe';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [RouterLink, PrecioPipe],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css'
})
export class Carrito {

  private carritoService = inject(CarritoService);
  private router = inject(Router);

  items: ItemCarrito[] = [];

  ngOnInit() {
    this.items = this.carritoService.obtener();
  }

  eliminar(id: number) {
    this.carritoService.eliminar(id);
    this.items = this.carritoService.obtener();
  }

  limpiar() {
    this.carritoService.limpiar();
    this.items = [];
  }

  get total() {
    return this.carritoService.total();
  }

  irCheckout() {
    this.router.navigate(['/checkout']);
  }
}