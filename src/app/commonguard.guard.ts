import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CommonguardGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const token = localStorage.getItem('token');
    if (token) {
      // If token exists, allow access
      return true;
    } else {
      // If token doesn't exist, redirect to the login page
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
