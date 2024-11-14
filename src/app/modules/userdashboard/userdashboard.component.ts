import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserDashboardComponent {
  registerForm: any;
  
  searchForm: FormGroup;
  trains: Array<any> = [];
  
  constructor(private fb: FormBuilder) {
    // Initialize the search form with default values
    this.searchForm = this.fb.group({
      source: [''],
      destination: [''],
      date: ['']
    });
    
    // Dummy train data
    this.trains = [
      { id: 1, name: 'Express 101', type: 'AC', seats: 20, price: 100 },
      { id: 2, name: 'Superfast 202', type: 'Sleeper', seats: 50, price: 50 },
      { id: 3, name: 'Cityline 303', type: 'General', seats: 100, price: 30 },
    ];
  }

  // Method to handle train search - This can be expanded to filter trains based on search input
  onSearch() {
    const source = this.searchForm.value.source;
    const destination = this.searchForm.value.destination;
    const date = this.searchForm.value.date;

    // For now, logging the search criteria
    console.log('Searching for trains from', source, 'to', destination, 'on', date);

    // Add logic here to filter the `trains` array based on search criteria if necessary
    // For now, we display all trains as dummy data
  }

  // Method for handling profile actions
  onProfileAction(action: string) {
    if (action === 'disable') {
      console.log('Account disabled.');
      // Add logic to disable account
    } else if (action === 'delete') {
      console.log('Account deleted.');
      // Add logic to delete account
    }
  }

  // Method to book a ticket
  onBookTicket(trainId: number) {
    console.log(`Booking ticket for train ID: ${trainId}`);
    // Add logic for booking ticket here
  }
}
