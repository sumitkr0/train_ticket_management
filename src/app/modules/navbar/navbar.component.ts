import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router) {}

  // Logout function
  logout(): void {
    // Clear token from localStorage or sessionStorage
    localStorage.removeItem('token'); // or sessionStorage.removeItem('token');
    
    // Redirect to login page
    this.router.navigate(['/login']);
  }
}
