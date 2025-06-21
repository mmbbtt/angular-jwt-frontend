import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean 
  {
    const currentUser = this.authService.currentUserValue;
    
    if (currentUser && this.authService.isAuthenticated()) 
    {
      // Usuario autenticado, permitir acceso
      return true;
    }

    // Usuario no autenticado, redirigir a login
    this.router.navigate(['/login']);
    return false;
  }
}