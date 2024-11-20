import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'; // To navigate after login

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const loginData = {
      email: this.email,
      password: this.password
    };

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.post('http://localhost:8080/user/login', loginData, { headers })
      .subscribe(
        (response: any) => {
          console.log('Login successful:', response);

          // Store the token and user data in localStorage (or sessionStorage)
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.userResponseDto));

          console.log(localStorage.getItem('token'));
          // Redirect based on user role
          if (response.userResponseDto.role === 'ADMIN') {
            this.router.navigate(['/admindashboard']);
          } else if (response.userResponseDto.role === 'USER') {
            this.router.navigate(['/userdashboard']);
          }
        },
        (error) => {
          console.error('Login failed:', error);
        }
      );
  }
}
