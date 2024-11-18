import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  user: any;
  token: any;
  searchForm: FormGroup;
  trains: Array<any> = []; // Dynamically fetched trains
  apiBaseUrl: string = 'http://localhost:8080/trains'; // Base URL for API

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.searchForm = this.fb.group({
      source: [''],
      destination: [''],
      date: ['']
    });
  }

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      this.user = JSON.parse(storedUser);
      this.token = 'Bearer ' + storedToken;
    }
  }

  onSearch() {
    const { source, destination } = this.searchForm.value;

    if (!source || !destination) {
      console.error('Source and destination are required!');
      return;
    }

    // API call to fetch trains based on source and destination
    const url = `${this.apiBaseUrl}/searchtrain?source=${source}&destination=${destination}`;
    this.http.get<any[]>(url).subscribe({
      next: (response) => {
        console.log('Trains fetched from API:', response);
        this.trains = response.length ? response : [];
      },
      error: (error) => {
        console.error('Error fetching trains:', error);
      }
    });
  }

  onBookTicket(trainId: number, seatType: string) {
    console.log(`Booking ticket for Train ID: ${trainId}, Seat Type: ${seatType}`);
    // Logic for booking tickets can be added here
  }
  onProfileAction(action: string) {
    if (action === 'disable') {
      // Logic for disabling the account
    } else if (action === 'delete') {
      // Logic for deleting the account
    }
  }
}
