import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';  // Import Router for navigation

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  contact: string = '';
  dob: string = '';
  address: string = '';
  password: string = '';
  terms: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  // Method to handle form submission
  onRegister(form: NgForm) {
    if (form.valid) {
      // Prepare the registration data object
      const registrationData = {
        name: this.name,
        email: this.email,
        contactNo: this.contact,
        address: this.address,
        password: this.password,
        dob: this.dob,
        role: 'USER', // Or 'ADMIN' based on your requirement
        status: 'ACTIVE'
      };

      // Prepare the headers
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json');
        // .set('Authorization', 'Bearer <YOUR_TOKEN>'); // Replace <YOUR_TOKEN> with the actual token if needed

      // Make the POST API call
      this.http
        .post('http://localhost:8080/user/register', registrationData, { headers, observe: 'response' })
        .subscribe(
          (response) => {
            if (response.status === 201) {
              console.log('Registration successful.');
              alert(`Registration successful! Status: ${response.status}`);
              form.reset(); // Reset the form after submission

              // Navigate to login page after successful registration
              this.router.navigate(['/login']);  // Redirect to login page
            } else {
              alert(`Unexpected status code: ${response.status}. Response: ${JSON.stringify(response.body)}`);
            }
          },
          (error: HttpErrorResponse) => {
            console.error('Registration failed:', error.error);
            console.error('HTTP Status:', error.status);
            alert(`Registration failed! Status: ${error.status}, Error: ${JSON.stringify(error.error)}`);
          }
        );
    } else {
      alert('Please fill out all required fields.');
    }
  }
}
