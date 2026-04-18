import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'precio',
  standalone: true
})
export class PrecioPipe implements PipeTransform {
  transform(valor: number): string {
    return `$${Number(valor).toFixed(2)}`;  // <-- agrega Number()
  }
}