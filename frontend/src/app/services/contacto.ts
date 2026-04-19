import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ContactoData {
  nombre: string;
  email: string;
  mensaje: string;
}

@Injectable({ providedIn: 'root' })
export class ContactoService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api`;

  enviarMensaje(data: ContactoData): Observable<any> {
    return this.http.post(`${this.apiUrl}/contacto`, data);
  }
}