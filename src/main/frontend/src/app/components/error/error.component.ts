import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit 
{

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void 
  {
    // Limpiar cualquier token existente
    this.authService.logout();
  }

  goToLogin(): void 
  {
    this.router.navigate(['/login']);
  }
}