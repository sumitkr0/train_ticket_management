import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  trainName: any;
  bookingForm: FormGroup = this.fb.group({
    trainId: [parseInt(localStorage.getItem('trainId') || '0')],
    journeyDate: ['', Validators.required],
    coach: ['', Validators.required],
    passengers: this.fb.array([this.createPassenger()])
  });
  minDate: string = new Date().toISOString().split('T')[0];

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.trainName = localStorage.getItem('trainName');
  }

  // Method to create a new passenger FormGroup
  createPassenger(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      gender: ['', Validators.required]
    });
  }

  // Getter for passengers FormArray
  get passengersArray(): FormArray {
    return this.bookingForm.get('passengers') as FormArray;
  }

  // Method to add a new passenger
  addPassenger(): void {
    this.passengersArray.push(this.createPassenger());
  }

  // Method to remove a passenger
  removePassenger(index: number): void {
    if (this.passengersArray.length > 1) {
      this.passengersArray.removeAt(index);
    }
  }

  // Method to submit the form and make the API call
  onSubmit(): void {
    if (this.bookingForm.valid) {
      const bookingData = this.bookingForm.value;

      // API call to book the ticket
      this.bookTicket(bookingData).subscribe({
        next: (response: HttpResponse<any>) => {
          if (response.status === 201) { // Check if status is 201
            alert('Booking successful!');
            this.router.navigate(['/user-bookings']); // Navigate to the bookings page
          } else {
            console.log('Unexpected status code:', response.status);
          }
        },
        error: (err) => {
          console.error('Error booking ticket:', err);
          alert('Failed to book ticket. Please try again.');
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }

  // Method to call the API
  bookTicket(bookingData: any): Observable<HttpResponse<any>> {
    const token = localStorage.getItem('token');
    const url = 'http://localhost:8080/booking/book';
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    // Use observe: 'response' to get the full HTTP response
    return this.http.post<HttpResponse<any>>(url, bookingData, { headers, observe: 'response' });
  }
}
