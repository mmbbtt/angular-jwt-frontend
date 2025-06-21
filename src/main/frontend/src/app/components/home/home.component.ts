import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, ApiResponse } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit 
{
  loading = false;
  apiResponse: ApiResponse | null = null;
  errorMessage = '';
  currentYear = new Date().getFullYear();

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void 
  {
    // Verificar autenticación
    if (!this.authService.isAuthenticated()) 
    {
      this.router.navigate(['/error']);
    }
  }

  callGreetingsApi(): void 
  {
    this.loading = true;
    this.errorMessage = '';
    this.apiResponse = null;

    this.authService.getGreetings()
      .subscribe({
        next: (response) => {
          console.log('Respuesta de la API:', response);
          this.apiResponse = response;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al llamar a la API:', error);
          this.errorMessage = 'Error al consultar la API de greetings';
          this.loading = false;
          
          // Si es error 401/403, redirigir a error
          if (error.status === 401 || error.status === 403) {
            this.router.navigate(['/error']);
          }
        }
      });
  }

  logout(): void 
  {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  formatJson(obj: any): string 
  {
    return JSON.stringify(obj, null, 2);
  }
}