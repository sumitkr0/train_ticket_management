import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard1 implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedUser && storedToken) {
      const user = JSON.parse(storedUser);
      const token = 'Bearer ' + storedToken;
      if (user.role === 'ADMIN') {
        return true;
      }
      else {
        localStorage.clear();
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      localStorage.clear();
      this.router.navigate(['/login']);
      return false;
    }
  }
}
