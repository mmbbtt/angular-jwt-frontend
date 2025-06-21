import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit 
{
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) 
  {
    // Redirigir a home si ya está autenticado
    if (this.authService.currentUserValue) 
    {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void 
  {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // Getter para acceso fácil a los campos del formulario
  get f() { return this.loginForm.controls; }

  onSubmit(): void 
  {
    this.submitted = true;
    this.errorMessage = '';

    // Parar si el formulario es inválido
    if (this.loginForm.invalid) 
    {
      return;
    }

    this.loading = true;
    
    const loginRequest = 
    {
      userName: this.f['userName'].value,
      password: this.f['password'].value
    };

    this.authService.login(loginRequest)
      .subscribe({
        next: (response) => {
          console.log('Login exitoso:', response);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Error en login:', error);
          this.errorMessage = 'Usuario o contraseña incorrectos';
          this.loading = false;
        }
      });
  }
}
