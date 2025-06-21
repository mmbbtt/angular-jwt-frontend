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
  showPassword = false;

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
    this.initializeForm();
  }

  private initializeForm(): void 
  {
    this.loginForm = this.formBuilder.group({
      userName: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(4)
      ]]
    });

    // Limpiar mensaje de error cuando el usuario empiece a escribir
    this.loginForm.valueChanges.subscribe(() => {
      if (this.errorMessage) {
        this.errorMessage = '';
      }
    });
  }

  // Getter para acceso fácil a los campos del formulario
  get f() { return this.loginForm.controls; }

  togglePasswordVisibility(): void 
  {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void 
  {
    this.submitted = true;
    this.errorMessage = '';

    // Parar si el formulario es inválido
    if (this.loginForm.invalid) 
    {
      this.markFormGroupTouched();
      return;
    }

    this.performLogin();
  }

  private markFormGroupTouched(): void 
  {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  private performLogin(): void 
  {
    this.loading = true;
    
    const loginRequest = 
    {
      userName: this.f['userName'].value.trim(),
      password: this.f['password'].value
    };

    console.log('Intentando login con:', { userName: loginRequest.userName });

    this.authService.login(loginRequest)
      .subscribe({
        next: (response) => {
          console.log('Login exitoso:', response);
          this.handleSuccessfulLogin();
        },
        error: (error) => {
          console.error('Error en login:', error);
          this.handleLoginError(error);
        }
      });
  }

  private handleSuccessfulLogin(): void 
  {
    // Pequeño delay para mejor UX
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 500);
  }

  private handleLoginError(error: any): void 
  {
    this.loading = false;
    
    // Mapear diferentes tipos de errores
    if (error.status === 401) {
      this.errorMessage = 'Usuario o contraseña incorrectos';
    } else if (error.status === 403) {
      this.errorMessage = 'Acceso denegado. Verifica tus permisos';
    } else if (error.status === 0) {
      this.errorMessage = 'No se pudo conectar con el servidor. Verifica que esté funcionando';
    } else if (error.status >= 500) {
      this.errorMessage = 'Error interno del servidor. Inténtalo más tarde';
    } else {
      this.errorMessage = 'Error de conexión. Verifica tu red e inténtalo nuevamente';
    }

    // Limpiar el campo de contraseña en caso de error
    this.loginForm.patchValue({ password: '' });
    this.loginForm.get('password')?.markAsUntouched();
  }

  // Método para manejar Enter en los campos
  onKeyPress(event: KeyboardEvent): void 
  {
    if (event.key === 'Enter' && !this.loading) {
      this.onSubmit();
    }
  }

  // Método para obtener mensaje de error específico del campo
  getFieldErrorMessage(fieldName: string): string 
  {
    const field = this.loginForm.get(fieldName);
    
    if (field && field.errors && field.touched) {
      if (field.errors['required']) {
        return `${this.getFieldDisplayName(fieldName)} es requerido`;
      }
      if (field.errors['minlength']) {
        const requiredLength = field.errors['minlength'].requiredLength;
        return `${this.getFieldDisplayName(fieldName)} debe tener al menos ${requiredLength} caracteres`;
      }
    }
    
    return '';
  }

  private getFieldDisplayName(fieldName: string): string 
  {
    const fieldNames: { [key: string]: string } = {
      'userName': 'El usuario',
      'password': 'La contraseña'
    };
    
    return fieldNames[fieldName] || fieldName;
  }

  // Método para verificar si un campo tiene error
  hasFieldError(fieldName: string): boolean 
  {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.errors && (field.dirty || field.touched || this.submitted));
  }

  // Método para verificar si un campo es válido
  isFieldValid(fieldName: string): boolean 
  {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.valid && (field.dirty || field.touched));
  }
}