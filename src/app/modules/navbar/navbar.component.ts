import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  user: any;
  token :any;
  constructor(private router: Router) {}
  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      this.user = JSON.parse(storedUser);
      this.token = 'Bearer ' + storedToken;
    }
  }
  // Logout function
  logout(): void {
    // Clear token from localStorage or sessionStorage
    localStorage.clear();
    
    // Redirect to login page
    this.router.navigate(['/login']);
  }
}
