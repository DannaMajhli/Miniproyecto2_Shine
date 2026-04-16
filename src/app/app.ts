import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly title = signal('shine');

  private router = inject(Router);

  irCategoria(categoria: string) {
    this.router.navigate(['/productos'], {
      queryParams: { categoria: categoria }
    });
  }

  irInicio() {
  this.router.navigate(['/']);
}
}