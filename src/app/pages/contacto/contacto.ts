import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css'
})
export class Contacto {

  private router = inject(Router);

  nombre: string = '';
  email: string = '';
  mensaje: string = '';
  enviado: boolean = false;

  enviar(form: any) {
    if (form.valid) {
      this.enviado = true;
      setTimeout(() => {
        this.enviado = false;
        form.resetForm();
      }, 3000);
    }
  }
}