import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactoService } from '../../services/contacto';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css'
})
export class Contacto {

  private contactoService = inject(ContactoService);

  nombre: string = '';
  email: string = '';
  mensaje: string = '';
  enviado = signal(false);
  error = signal(false);

  enviar(form: any) {
    if (form.valid) {
      this.contactoService.enviarMensaje({
        nombre: this.nombre,
        email: this.email,
        mensaje: this.mensaje
      }).subscribe({
        next: () => {
          this.enviado.set(true);
          this.error.set(false);
          setTimeout(() => {
            this.enviado.set(false);
            form.resetForm();
          }, 5000);
        },
        error: () => {
          this.error.set(true);
        }
      });
    }
  }
}