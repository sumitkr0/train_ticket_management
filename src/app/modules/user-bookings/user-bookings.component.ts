import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.css']
})
export class UserBookingsComponent implements OnInit {
  bookings: any[] = []; // Array to store booking data
  token: string | null = localStorage.getItem('token'); // Retrieve token from localStorage

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchBookings();
  }

  fetchBookings(): void {
    const url = 'http://localhost:8080/booking/getByUser';
    const token = localStorage.getItem('token');
    console.log(token);
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');


    this.http.get<any[]>(url, { headers }).subscribe({
      next: (response) => {
        console.log('Bookings fetched:', response);
        this.bookings = response;
      },
      error: (err) => {
        console.error('Error fetching bookings:', err);
      }
    });
  }
}
