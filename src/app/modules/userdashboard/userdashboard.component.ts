import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import Validators
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  user: any;
  token: any;
  hasSearched = false;
  searchForm: FormGroup;
  minDate: string = ''; 
  trains: Array<any> = []; // Dynamically fetched trains
  apiBaseUrl: string = 'http://localhost:8080/trains'; // Base URL for API

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.searchForm = this.fb.group({
      source: ['', Validators.required], // Source is required
      destination: ['', Validators.required], // Destination is required
      date: ['', Validators.required] // Date is required
    });
  }

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      this.user = JSON.parse(storedUser);
      this.token = 'Bearer ' + storedToken;
    }
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0]; 
  }

  onSearch() {
    if (this.searchForm.invalid) {
      console.error('All fields are required!');
      return;
    }

    const { source, destination, date } = this.searchForm.value;
    this.trains = [];
    this.hasSearched = true;
    localStorage.setItem('selectedDate',date);

    // API call to fetch trains based on source, destination, and date
    const url = `${this.apiBaseUrl}/searchtrain?source=${source}&destination=${destination}&date=${date}`;
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

  onBookTicket(trainId: number, trainName: string) {
    console.log(`Booking ticket for Train ID: ${trainId}`);
    console.log(`Booking ticket for Train Name: ${trainName}`);

    localStorage.setItem('trainId',trainId.toString());
    localStorage.setItem('trainName', trainName);
  }

  onProfileAction(action: string) {
    if (action === 'disable') {
      // Logic for disabling the account
    } else if (action === 'delete') {
      // Logic for deleting the account
    }
  }
}
