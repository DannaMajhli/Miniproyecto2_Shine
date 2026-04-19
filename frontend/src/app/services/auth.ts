import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api`;

  usuarioActivo = signal<string | null>(null);

  login(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  guardarSesion(nombre: string) {
    this.usuarioActivo.set(nombre);
  }

  cerrarSesion() {
    this.usuarioActivo.set(null);
  }

  estaLogueado(): boolean {
    return this.usuarioActivo() !== null;
  }
}