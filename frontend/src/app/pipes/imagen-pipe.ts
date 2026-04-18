import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'imagen',
  standalone: true
})
export class ImagenPipe implements PipeTransform {
  transform(ruta: string): string {
    return `${environment.apiUrl}/${ruta}`;
  }
}