import { Component } from '@angular/core';
import { Router } from '@angular/router'; // To navigate after login

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    // Mock response for UI testing
    const mockResponse = {
      token: 'mock-token',
      userResponseDto: {
        role: this.email === 'admin@example.com' ? 'ADMIN' : 'USER'
      }
    };

    console.log('Login successful:', mockResponse);

    // Store the token and user data in localStorage (or sessionStorage)
    localStorage.setItem('token', mockResponse.token);
    localStorage.setItem('user', JSON.stringify(mockResponse.userResponseDto));

    // Redirect based on user role
    if (mockResponse.userResponseDto.role === 'ADMIN') {
      this.router.navigate(['/admindashboard']);
    } else if (mockResponse.userResponseDto.role === 'USER') {
      this.router.navigate(['/userdashboard']);
    }
  }
}