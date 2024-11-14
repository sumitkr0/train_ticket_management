// register.component.ts

import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

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

  constructor() {}

  // Method to handle form submission
  onRegister(form: NgForm) {
    if (form.valid) {
      // Registration data object
      const registrationData = {
        name: this.name,
        email: this.email,
        contact: this.contact,
        dob: this.dob,
        address: this.address,
        password: this.password,
        terms: this.terms
      };

      console.log('Registration data:', registrationData);
      alert('Registration successful!');
      
      // Reset the form after submission
      form.reset();
    } else {
      alert('Please fill out all required fields.');
    }
  }
}
