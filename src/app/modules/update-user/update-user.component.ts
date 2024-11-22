import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  user :any;
  updateForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNo: ['', [Validators.required, Validators.pattern('^[6-9]{1}[0-9]{9}$')]],
      address: ['', Validators.required],
      dob: ['', Validators.required],
      password: ['']
    });
  }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}'); // Parse user data from localStorage
  
    if (user && user.name) {
      this.updateForm.patchValue({
        name: user.name,
        email: user.email,
        contactNo: user.contactNo,
        address: user.address,
        dob: user.dob,
        password: '' // Password shouldn't be pre-filled for security reasons
      });
  
      // Optional: You can log the user data for debugging
      console.log(user);
    } else {
      console.error('User data not found in localStorage');
    }
  }

  onSubmit(): void {
    if (this.updateForm.valid) {
      const updatedData = this.updateForm.value;

      if (!updatedData.password) {
        delete updatedData.password;
      }

      const token = localStorage.getItem('token'); 

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json');

      this.http.put('http://localhost:8080/user/update', updatedData, { headers })
        .subscribe(
          (response) => {
            alert('Profile updated successfully!');
            localStorage.setItem('user',JSON.stringify(response));
            this.router.navigate(['/userdashboard']);
          },
          (error) => {
            console.error('Error updating profile', error);
            alert('Failed to update profile. Please try again later.');
          }
        );
    } else {
      console.log('Form is invalid');
    }
  }
}
