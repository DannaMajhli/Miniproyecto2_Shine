import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  error = false;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });

  get f() {
    return this.form.controls;
  }

  ingresar() {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      this.authService.login(email!, password!).subscribe({
        next: (res) => {
          if (res.ok) {
            this.authService.guardarSesion(res.nombre);
            this.router.navigate(['/checkout']);
          } else {
            this.error = true;
          }
        },
        error: () => {
          this.error = true;
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}