import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

@Component({
  selector: 'app-food-booking',
  templateUrl: './food-booking.component.html',
  styleUrls: ['./food-booking.component.css']
})
export class FoodBookingComponent implements OnInit {
  bookings: any[] = [];
  foods: any[] = [];
  selectedBookingId: number | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadBookings();
    this.loadFoods();
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  loadBookings(): void {
    const headers = this.getHeaders();
    this.http.get<any[]>('http://localhost:8080/booking/getByUser', { headers })
      .pipe(catchError(this.handleError('loadBookings', [])))
      .subscribe(data => {
        this.bookings = data;
      });
  }

  loadFoods(): void {
    const headers = this.getHeaders();
    this.http.get<any[]>('http://localhost:8080/food', { headers })
      .pipe(catchError(this.handleError('loadFoods', [])))
      .subscribe(data => {
        this.foods = data;
      });
  }

  updateQuantity(foodId: number, quantity: number): void {
    const foodItem = this.foods.find(food => food.id === foodId);
    if (foodItem) {
      foodItem.quantity = quantity;
    }
  }

  submitBooking(): void {
    if (!this.selectedBookingId) {
      console.error('Please select a booking.');
      return;
    }
  
    const selectedBooking = this.bookings.find(booking => booking.id === this.selectedBookingId);
    const bookedFoods = this.foods
      .filter(food => food.quantity > 0)
      .reduce((acc, food) => {
        acc[food.id] = food.quantity;
        return acc;
      }, {});
  
    const bookingData = {
      bookingId: this.selectedBookingId,
      bookingDetails: selectedBooking,
      foods: bookedFoods  
    };
  
    const headers = this.getHeaders();

    this.http.post('http://localhost:8080/foodBooking', bookingData, { headers })
      .pipe(
        catchError((error) => {
          // Handle actual errors from API
          if (error.status === 400) {
            console.error('Bad Request: ', error);
            alert('Invalid data format or missing fields. Please check your inputs.');
          } else {
            console.error('submitBooking failed:', error);
            alert('An unexpected error occurred during submission.');
          }
          return of(null);  // Avoid breaking the flow
        })
      )
      .subscribe(response => {
        if (response) {
          console.log('Booking submitted successfully:', response);
          alert('Booking submitted successfully!');
        } else {
          // If response is null, do not show success alert
          console.error('No valid response from API');
        }
      });
}


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      alert(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
