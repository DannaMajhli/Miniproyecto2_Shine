import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CarritoService } from '../../services/carrito';
import { PrecioPipe } from '../../pipes/precio-pipe';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, PrecioPipe],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private carritoService = inject(CarritoService);

  enviado = false;
  total = 0;

  form = this.fb.group({
    nombre: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
      Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')
    ]],
    email: ['', [
      Validators.required,
      Validators.email,
      Validators.maxLength(100)
    ]],
    telefono: ['', [
      Validators.required,
      Validators.pattern('^[0-9]{10}$'),
      Validators.minLength(10),
      Validators.maxLength(10)
    ]],
    direccion: ['', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(200)
    ]],
    ciudad: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)
    ]],
    codigoPostal: ['', [
      Validators.required,
      Validators.pattern('^[0-9]{5}$'),
      Validators.minLength(5),
      Validators.maxLength(5)
    ]],
    metodoPago: ['', [
      Validators.required
    ]]
  });

  ngOnInit() {
    this.total = this.carritoService.total();
  }

  get f() {
    return this.form.controls;
  }

  confirmar() {
    if (this.form.valid) {
      this.carritoService.limpiar();
      this.enviado = true;
    } else {
      this.form.markAllAsTouched();
    }
  }

  volverTienda() {
    this.router.navigate(['/productos']);
  }
}