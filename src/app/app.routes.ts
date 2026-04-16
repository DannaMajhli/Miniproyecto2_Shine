import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/inicio/inicio').then(m => m.Inicio) },
  { path: 'productos', loadComponent: () => import('./pages/productos/productos').then(m => m.Productos) },
  { path: 'producto/:id', loadComponent: () => import('./pages/producto-detalle/producto-detalle').then(m => m.ProductoDetalle) },
  { path: 'carrito', loadComponent: () => import('./pages/carrito/carrito').then(m => m.Carrito) },
  { path: 'checkout', loadComponent: () => import('./pages/checkout/checkout').then(m => m.Checkout) },
  { path: 'contacto', loadComponent: () => import('./pages/contacto/contacto').then(m => m.Contacto) },
  { path: '**', loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFound) }
];