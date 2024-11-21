import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-bookings',
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.css']
})
export class UserBookingsComponent implements OnInit {
  source:string = '';
  destination:string = '';
  bookings: any[] = []; // Array to store booking data
  selectedBooking: any = null; // Store the selected booking details
  token: string | null = localStorage.getItem('token'); // Retrieve token from localStorage

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchBookings();
  }

  // Fetch all bookings for the user
  fetchBookings(): void {
    const url = 'http://localhost:8080/booking/getByUser';
    const token = localStorage.getItem('token');
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

  // Fetch detailed information about a specific booking
  fetchBookingDetails(bookingId: string,source :string,destination:string): void {
    console.log(bookingId);
    const url = `http://localhost:8080/booking/getById?bookingId=${bookingId}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    this.http.get<any>(url, { headers }).subscribe({
      next: (response) => {
        console.log('Booking details fetched:', response);
        this.selectedBooking = response;
        this.source=source;
        this.destination=destination;
      },
      error: (err) => {
        console.error('Error fetching booking details:', err);
      }
    });
  }

  // Cancel a specific booking
  cancelBooking(bookingId: string): void {
    const url = `http://localhost:8080/booking/cancel?bookingId=${bookingId}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    this.http.put(url, {}, { headers }).subscribe({
      next: (response) => {
        console.log('Booking canceled:', response);
        // Refresh the bookings list after cancellation
        this.fetchBookings();
        this.selectedBooking = null; // Clear the selected booking details
      },
      error: (err) => {
        console.error('Error canceling booking:', err);
      }
    });
  }

  closeBookingDetails(): void {
    this.selectedBooking = null; // Close the detailed view
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedInside = (event.target as HTMLElement).closest('.booking-detail-card');
    if (!clickedInside && this.selectedBooking) {
      this.selectedBooking = null; // Close the card if clicked outside
    }
  }

  // Prevent closing when clicked inside the card
  onCardClick(event: MouseEvent): void {
    event.stopPropagation(); // Prevent the document click from triggering close
  }
  
}
