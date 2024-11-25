import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-food-booking-history',
  templateUrl: './food-booking-history.component.html',
  styleUrls: ['./food-booking-history.component.css']
})
export class FoodBookingHistoryComponent implements OnInit {

  // Array to store food booking data
  foodBookings: any[] = [];
  authorizationHeader: string = ''; // Will store the authorization token

  // API endpoint URL
  private apiUrl = 'http://localhost:8080/api/foodbookings';  // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Retrieve the JWT token from localStorage or an authentication service
    this.authorizationHeader = `Bearer ${localStorage.getItem('authToken')}`;

    // If token is available, fetch the food bookings
    if (this.authorizationHeader) {
      this.getFoodBookings();
    } else {
      console.log('Authorization token not found.');
    }
  }

  /**
   * Method to fetch food booking data from the API
   */
  getFoodBookings(): void {
    const headers = new HttpHeaders({
      'Authorization': this.authorizationHeader
    });

    this.http.get<any[]>(this.apiUrl, { headers }).subscribe(
      (response) => {
        this.foodBookings = response;
      },
      (error) => {
        console.error('Error fetching food bookings:', error);
      }
    );
  }
}
