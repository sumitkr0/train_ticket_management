import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookingForm: FormGroup = this.fb.group({
    trainId: [parseInt(localStorage.getItem('trainId') || '0')],
    journeyDate: ['', Validators.required],
    coach: ['', Validators.required],
    passengers: this.fb.array([this.createPassenger()])
  });
  minDate: string = new Date().toISOString().split('T')[0];

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {}

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
      console.log('Form Submitted:', bookingData);

      // API call to book the ticket
      this.bookTicket(bookingData).subscribe(
        (response) => {
          console.log('Ticket booked successfully:', response);
          // Handle success (e.g., navigate to another page)
        },
        (error) => {
          console.error('Error booking ticket:', error);
          // Handle error (e.g., show error message)
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  // Method to call the API
  bookTicket(bookingData: any): Observable<any> {
    const token=localStorage.getItem('token');
    console.log(bookingData);
    console.log(token);
    const url = 'http://localhost:8080/booking/book';
    const headers = new HttpHeaders()
  .set('Authorization', `Bearer ${token}`)  // Set Authorization header
  .set('Content-Type', 'application/json');      // Set Content-Type header

    console.log(headers);

    return this.http.post(url, bookingData, { headers });
  }
  
}
